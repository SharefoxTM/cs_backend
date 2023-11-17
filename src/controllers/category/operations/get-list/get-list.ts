import { AxiosResponse } from "axios";
import { Handler, response } from "express";
import { APICategory } from "../../../../models/Category.model";
import { urlCategory } from "../../resources";

const axios = require("axios");
require("dotenv").config();

export const getAllCategories: Handler = (req, res, next) => {
	axios
		.get(urlCategory, {
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
