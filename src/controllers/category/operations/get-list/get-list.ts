import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APICategory } from "../../../../models/Category.model";
import { inventree, selfAccess } from "../../../../server";
import Map from "../../../../helpers/mapItems.helper";
import resource from "../../resources";
import { ajv } from "../../../../middleware/Ajv/validator";

export const getAllCategories: Handler = (req, res) => {
	const validate = ajv.getSchema("GET /categories")!;
	if (!validate(req.query)) {
		return res.status(400).json(validate.errors);
	}
	inventree
		.get(`api/part/category/`, { params: req.query })
		.then((response: AxiosResponse<APICategory>) => {
			res.json(response.data);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getCategoryTree: Handler = (req, res) => {
	selfAccess
		.get(`categories/`)
		.then((response: AxiosResponse<APICategory>) => {
			res.json(Map.mapTree(resource.buildTree(response.data, null)));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
