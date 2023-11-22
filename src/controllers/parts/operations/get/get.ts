import { Handler } from "express";
import { urlPart } from "../../resources";
import { AxiosResponse } from "axios";
import { APIPart } from "../../../../models/APIPart.model";
import Map from "../../../../helpers/mapItems";

const axios = require("axios");
require("dotenv").config();

export const getPart: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const url = urlPart + `${req.params.id}/`;
	axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APIPart>) => {
			return response.data;
		})
		.then((response: APIPart) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(Map.mapPart(response));
		});
};
