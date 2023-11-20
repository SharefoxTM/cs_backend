import { Handler } from "express";
import { urlCategory } from "../../resources";
import { AxiosResponse } from "axios";
import { APICategory } from "../../../../models/Category.model";

const axios = require("axios");

export const getCategory: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	axios
		.get(urlCategory + `${req.params.id}/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APICategory>) => {
			return response.data;
		})
		.then((response: APICategory) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(response);
		});
};
