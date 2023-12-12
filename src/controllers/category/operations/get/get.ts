import { Handler } from "express";
import axios, { AxiosResponse } from "axios";
import { APICategory } from "../../../../models/Category/Category.model";
require("dotenv");
export const getCategory: Handler = (req, res, next) => {
	axios
		.get(`${process.env.DB_HOST}/api/part/category/${req.params.id}/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APICategory>) => {
			return response.data;
		})
		.then((response: APICategory) => {
			res.json(response);
		});
};
