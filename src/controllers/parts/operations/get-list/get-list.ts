import { AxiosResponse } from "axios";
import { Handler, response } from "express";
import { APIPart } from "../../../../models/Part.model";
import { createURL, urlPart } from "../../resources";
import { PartQuery } from "../../../../models/PartQuery.model";
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
			res.json(response);
		});
};
