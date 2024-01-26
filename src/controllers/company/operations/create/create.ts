import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { NewSupplierPart } from "../../../../models/Company/NewSupplierPart.model";
import { inventree } from "../../../../server";

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

export const createSupplierPart: Handler = (req, res) => {
	if (validate(req.body)) {
		inventree
			.post(`api/company/part/`, req.body)
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
