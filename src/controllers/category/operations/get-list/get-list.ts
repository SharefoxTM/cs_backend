import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APICategory } from "../../../../models/Category/Category.model";
import { inventree } from "../../../../server";

export const getAllCategories: Handler = (req, res, next) => {
	inventree
		.get(`api/part/category/`)
		.then((response: AxiosResponse<APICategory>) => {
			res.json(response.data);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response),
		);
};
