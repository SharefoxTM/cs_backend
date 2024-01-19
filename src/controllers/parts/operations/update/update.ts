import { Handler } from "express";
import { AxiosError, AxiosResponse } from "axios";
import Ajv, { JSONSchemaType } from "ajv";
import { NewPart } from "../../../../models/Part/NewPart.model";
import addFormats from "ajv-formats";
import { inventree } from "../../../../server";

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

export const updatePart: Handler = (req, res, next) => {
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
