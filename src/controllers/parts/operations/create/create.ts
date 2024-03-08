import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { NewPart } from "../../../../models/Part/NewPart.model";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import { inventree, selfAccess } from "../../../../server";
import { APIPart } from "../../../../models/Part/APIPart.model";
import { NewParameter } from "../../../../models/Part/NewParameter.model";

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

export const createPart: Handler = (req, res) => {
	if (validate(req.body)) {
		inventree
			.post(`api/part/`, req.body)
			.then((response: AxiosResponse<APIPart>) => {
				res.json(response.data);
			})
			.catch((err: AxiosError) =>
				res.status(err.response?.status || 400).json(err.response),
			);
	} else {
		res.status(400).json(validate.errors);
	}
};

const schemaParam: JSONSchemaType<NewParameter> = {
	type: "object",
	properties: {
		part: { type: "number" },
		template: { type: "number" },
		data: { type: "string" },
	},
	required: ["part", "template", "data"],
	additionalProperties: false,
};

const validateParam = ajv.compile(schemaParam);

export const createParameter: Handler = (req, res) => {
	if (validateParam(req.body)) {
		selfAccess
			.get(`parts/parameter/template/${req.body.template}`)
			.then((resp: AxiosResponse) => {
				if (resp.data.choices !== "") {
					const choices = resp.data.choices.split(", ");
					if (!choices.includes(req.body.data))
						res
							.status(400)
							.json({ Message: "Data not acceptable for parameter template" });
				}
				inventree
					.get(
						`api/part/parameter/?part=${req.body.part}&template=${req.body.template}&limit=1`,
					)
					.then((resp: AxiosResponse) => {
						if (resp.data.count !== 0) {
							inventree
								.patch(`api/part/parameter/${resp.data.results[0].pk}/`, {
									data: req.body.data,
								})
								.then((response: AxiosResponse) => {
									res.json(response.data);
								})
								.catch((err: AxiosError) =>
									res
										.status(err.response?.status || 400)
										.json(err.response?.data),
								);
						} else {
							inventree
								.post(`api/part/parameter/`, req.body)
								.then((response: AxiosResponse) => {
									res.json(response.data);
								})
								.catch((err: AxiosError) =>
									res
										.status(err.response?.status || 400)
										.json(err.response?.data),
								);
						}
					});
			});
	} else {
		res.status(400).json(validate.errors);
	}
};
