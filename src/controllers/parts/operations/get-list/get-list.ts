import { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIPart } from "../../../../models/APIPart.model";
import { createURL } from "../../resources";
import Map from "../../../../helpers/mapItems";

const axios = require("axios");
require("dotenv").config();

export const getAllParts: Handler = async (req, res, next) => {
	const query = Map.mapQuery(req);
	console.log(query);
	console.log(req.query);
	const url = createURL(query);
	const page = parseInt(req.query.page?.toString() || "0") + 1;
	const pageSize = parseInt(req.query.pageSize?.toString() || "25");
	const startIndex = (page - 1) * pageSize;
	const endIndex = page * pageSize;
	const parts: APIPart = await axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APIPart>) => {
			return response.data;
		})
		.then((response: APIPart) => {
			return Map.mapPart(response);
		});
	// console.log(parts);
	const paginatedParts = parts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(parts.length / pageSize);

	res.header("Access-Control-Allow-Origin", "*");
	res.json({ data: paginatedParts, totalPages });
};
