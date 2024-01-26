import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { APICategory } from "../../../../models/Category/APICategory.model";
import { inventree } from "../../../../server";

const schema: JSONSchemaType<APICategory> = {
	type: "object",
	properties: {
		name: { type: "string", maxLength: 100 },
		description: { type: "string", nullable: true, maxLength: 250 },
		default_location: { type: "number", nullable: true },
		default_keywords: { type: "string", nullable: true, maxLength: 250 },
		parent: { type: "number", nullable: true },
		pathstring: { type: "string", nullable: true, maxLength: 250 },
		structural: { type: "boolean", nullable: true },
		icon: { type: "string", nullable: true, maxLength: 100 },
	},
	required: ["name"],
	additionalProperties: false,
};
const ajv = new Ajv();
const validate = ajv.compile(schema);

export const createCategory: Handler = (req, res) => {
	if (validate(req.body)) {
		inventree
			.post(`api/part/category/`, req.body)
			.then((response: AxiosResponse) => {
				res.status(201).json(response.data);
			})
			.catch((err: AxiosError) =>
				res.status(err.response?.status || 400).json(err),
			);
	} else {
		res.status(400).json(validate.errors);
	}
};
