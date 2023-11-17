import { AxiosResponse } from "axios";
import { Handler, response } from "express";
import { APICategory } from "../../../../models/Category.model";

const axios = require("axios");
require("dotenv").config();

const url = process.env.DB_HOST + "/api/part/category/";

export const getAllCategories: Handler = (req, res, next): APICategory => {
	return axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APICategory[]>) => {
			return response.data;
		})
		.then((response: APICategory[]) => {
			res.json(response);
			return response;
		});
};
