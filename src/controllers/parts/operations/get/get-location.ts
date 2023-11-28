import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import Map from "../../../../helpers/mapItems";
import { APIStockLocation } from "../../../../models/Stock/APIStockLocation.model";

export const getLocation: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const url = process.env.DB_HOST + `/api/stock/location/${req.params.id}/`;
	axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APIStockLocation>) => {
			return response.data;
		})
		.then((response: APIStockLocation) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(Map.mapStockLocation(response));
		});
};
