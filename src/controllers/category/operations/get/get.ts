import { Handler } from "express";
import { AxiosError, AxiosResponse } from "axios";
import { APICategory } from "../../../../models/Category.model";
import { inventree } from "../../../../server";

export const getCategory: Handler = (req, res) => {
	inventree
		.get(`api/part/category/${req.params.id}/`)
		.then((response: AxiosResponse<APICategory>) => {
			res.json(response.data);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
