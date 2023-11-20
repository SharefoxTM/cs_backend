import { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIPart } from "../../../../models/APIPart.model";
import { createURL } from "../../resources";
import Map from "../../../../helpers/mapItems";

const axios = require("axios");
require("dotenv").config();

export const getAllParts: Handler = (req, res, next) => {
	const query = Map.mapQuery(req);
	const url = createURL(query);

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
