import { Handler, Response } from "express";
import { AxiosError, AxiosResponse } from "axios";
import Ajv, { JSONSchemaType } from "ajv";
import { NewPart } from "../../../../models/Part.model";
import addFormats from "ajv-formats";
import { inventree } from "../../../../server";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

const schema: JSONSchemaType<NewPart> = {
	type: "object",
	properties: {
		active: { type: "boolean" },
		assembly: { type: "boolean" },
		category: { type: "number" },
		component: { type: "boolean" },
		default_expiry: {
			type: "number",
			nullable: true,
			minimum: 0,
			maximum: 2 ** 31,
		},
		default_location: { type: "number", nullable: true },
		default_supplier: { type: "number", nullable: true },
		description: { type: "string", nullable: true, maxLength: 250 },
		image: { type: "string", nullable: true, format: "uri" },
		IPN: { type: "string", nullable: true, maxLength: 100 },
		is_template: { type: "boolean" },
		keywords: { type: "string", nullable: true, maxLength: 250 },
		last_stocktake: { type: "string", nullable: true, format: "date" },
		link: { type: "string", nullable: true, maxLength: 200, format: "uri" },
		minimum_stock: {
			type: "number",
			nullable: true,
			minimum: 0,
			maximum: 2 ** 31,
		},
		name: { type: "string", maxLength: 100 },
		notes: { type: "string", nullable: true, maxLength: 50000 },
		purchaseable: { type: "boolean" },
		remote_image: { type: "string", nullable: true, format: "uri" },
		revision: { type: "string", nullable: true, maxLength: 100 },
		salable: { type: "boolean" },
		trackable: { type: "boolean" },
		units: { type: "string", nullable: true, maxLength: 20 },
		variant_of: { type: "number", nullable: true },
		virtual: { type: "boolean" },
		responsible: { type: "number", nullable: true },
		tags: { type: "array", items: { type: "string" }, nullable: true },
	},
	required: [
		"active",
		"assembly",
		"category",
		"component",
		"is_template",
		"name",
		"purchaseable",
		"salable",
		"trackable",
		"virtual",
	],
	additionalProperties: false,
};

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(schema);

export const updatePart: Handler = (req, res) => {
	if (validate(req.body)) {
		inventree
			.put(`api/part/${req.params.id}/`, req.body)
			.then((response: AxiosResponse) => {
				res.json(response.data);
			})
			.catch((err: AxiosError) =>
				res.status(err.response?.status || 400).json(err.response),
			);
	} else {
		res.status(400).json(validate.errors);
	}
};

const imageFolder = "src/tmp/images/";
const part_imagesFolder = imageFolder + "part_images/";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, imageFolder);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const uploadThumbnail = (
	fileLocation: string,
	partID: string | number,
	response: Response,
) => {
	const formData = new FormData();
	formData.append("image", fs.createReadStream(fileLocation));
	inventree
		.patch(`api/part/${partID}/`, formData, {
			headers: {
				...formData.getHeaders(),
				"content-type": "multipart/form-data",
			},
		})
		.then((res: AxiosResponse) => response.status(201).json(res.data))
		.catch((err: AxiosError) => {
			response.status(err.response?.status || 500).json(err.response?.data);
		});
};

const writer = (
	filePath: fs.PathLike,
	data: Readable,
): Promise<void | string> => {
	return new Promise<void | string>((resolve, reject) => {
		const stream = fs.createWriteStream(filePath);
		data.pipe(stream);
		stream.on("finish", () => {
			resolve();
		});
		stream.on("error", (err) => {
			reject(err);
		});
	});
};

const downloadImage = (
	imageURL: string,
	filePath: fs.PathLike,
): Promise<void | string> =>
	inventree
		.get(`media/${imageURL}/`, { responseType: "arraybuffer" })
		.then((imageResponse: AxiosResponse) => {
			const imageStream = new Readable();
			imageStream._read = () => {};
			imageStream.push(imageResponse.data);
			imageStream.push(null);

			return writer(filePath, imageStream);
		});

const deleteTempImage = (filePath: fs.PathLike) =>
	fs.unlink(filePath, (err) => {
		if (err) return console.error(err);
	});

export const updateThumbnail: Handler = (req, res) => {
	const partID = req.params.id;
	multer({ storage: storage }).single("image")(req, res, () => {
		if (req.file)
			return uploadThumbnail(
				path.resolve(imageFolder + req.file.filename),
				partID,
				res,
			);
		// If no file is uploaded, the image URL is used
		const imageURL = req.body.image;
		const imageName = imageURL.split("/").pop();
		const tempLocation = path.resolve(part_imagesFolder + imageName);

		downloadImage(imageURL, tempLocation)
			.then(() => uploadThumbnail(tempLocation, partID, res))
			.catch((err) => res.status(500).json(err))
			.finally(() => deleteTempImage(tempLocation));
	});
};
