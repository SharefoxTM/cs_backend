import axios, { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { NewCategory } from "../../../../models/Category/NewCategory.model";

const schema: JSONSchemaType<NewCategory> = {
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

export const createCategory: Handler = async (req, res, next) => {
	if (validate(req.body)) {
		axios
			.post(`${process.env.DB_HOST}/api/part/category/`, req.body, {
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
