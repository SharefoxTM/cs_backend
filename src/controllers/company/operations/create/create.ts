import axios, { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { NewSupplierPart } from "../../../../models/Company/NewSupplierPart.model";

const schema: JSONSchemaType<NewSupplierPart> = {
	type: "object",
	properties: {
		available: { type: "string", nullable: true },
		description: { type: "string", nullable: true },
		link: { type: "string", nullable: true },
		manufacturer_part: { type: "number", nullable: true },
		note: { type: "string", nullable: true },
		packaging: { type: "string", nullable: true },
		pack_quantity: { type: "string", nullable: true },
		pack_quantity_native: { type: "string", nullable: true },
		part: { type: "number" },
		SKU: { type: "string" },
		supplier: { type: "number" },
		tags: { type: "array", items: { type: "string" }, nullable: true },
	},
	required: ["part", "SKU", "supplier"],
	additionalProperties: false,
};
const ajv = new Ajv();
const validate = ajv.compile(schema);

export const createSupplierPart: Handler = async (req, res, next) => {
	if (validate(req.body)) {
		axios
			.post(`${process.env.DB_HOST}/api/company/part/`, req.body, {
				headers: {
					Authorization: process.env.DB_TOKEN,
				},
			})
			.then((response: AxiosResponse) => {
				return response.data;
			})
			.then((response: any) => {
				res.json(response);
			})
			.catch((err: AxiosError) => res.status(err.status || 400).json(err));
	} else {
		res.status(400).json(validate.errors);
	}
};
