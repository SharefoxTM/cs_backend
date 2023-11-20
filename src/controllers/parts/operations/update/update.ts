import { Handler } from "express";
import Map from "../../../../helpers/mapItems";
import { urlPart } from "../../resources";
import { APIPart } from "../../../../models/APIPart.model";
import { AxiosResponse } from "axios";

const axios = require("axios");
require("dotenv").config();

export const updatePart: Handler = (req, res, next) => {
	axios
		.put(urlPart, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			data: req.body,
		})
		.then((response: AxiosResponse<APIPart>) => {
			return response.data;
		})
		.then((response: APIPart) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(Map.mapPart(response));
		});
};
