import { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIBuildOrders } from "../../../../models/BuildOrders/APIBuildOrders.model";
import Map from "../../../../helpers/mapItems";

const axios = require("axios");
require("dotenv").config();

export const getBuildOrders: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const url =
		process.env.DB_HOST +
		`/api/build/item/?part=${req.params.id}&build_detail=true&stock_detail=false&location_detail=false&part_detail=false`;
	axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APIBuildOrders>) => {
			return response.data;
		})
		.then((response: APIBuildOrders) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(Map.mapBuildOrders(response));
		});
};
