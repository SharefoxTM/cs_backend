import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { inventree } from "../../../../server";
import { ajv } from "../../../../middleware/Ajv/validator";

const validate = ajv.getSchema("POST /categories")!;

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
		res.status(400).json({ error: validate.errors![0].message });
	}
};
