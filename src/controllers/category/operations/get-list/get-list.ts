import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APICategory } from "../../../../models/Category/Category.model";

require("dotenv");

export const getAllCategories: Handler = (req, res, next) => {
	axios
		.get(`${process.env.DB_HOST}/api/part/category/`, {
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
