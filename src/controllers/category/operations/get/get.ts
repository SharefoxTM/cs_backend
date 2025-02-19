import { Handler } from "express";
import { AxiosError, AxiosResponse } from "axios";
import { APICategory } from "../../../../models/Category.model";
import { inventree, selfAccess } from "../../../../server";
import { ajv } from "../../../../middleware/Ajv/validator";

export const getCategory: Handler = (req, res) => {
	const validate = ajv.getSchema("GET /categories")!;
	if (!validate(req.query)) {
		return res.status(400).json(validate.errors);
	}
	if (Number.isNaN(parseInt(req.params.id))) {
		selfAccess
			.get(`categories/?limit=1&search=${req.params.id}`)
			.then((response) => {
				if (response.data.count === 0) {
					return res.status(404).json(null);
				}
				return res
					.status(response.status)
					.json({ pk: response.data.results[0].pk });
			})
			.catch((err: AxiosError) => {
				return res.status(err.response?.status || 404).json(err.response?.data);
			});
	} else {
		inventree
			.get(`api/part/category/${req.params.id}/`)
			.then((response: AxiosResponse<APICategory>) => {
				res.json(response.data);
			})
			.catch((err: AxiosError) =>
				res.status(err.response?.status || 400).json(err.response?.data),
			);
	}
};
