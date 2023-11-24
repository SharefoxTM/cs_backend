import { Handler, response } from "express";
import { urlPart } from "../../resources";
import { AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems";
import { APIPartParameter } from "../../../../models/APIPartParameter.model";
import { APIPartStock } from "../../../../models/APIPartStock.model";

const axios = require("axios");
require("dotenv").config();

export const getDetails: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const id = req.params.id;
	let url = process.env.DB_HOST;
	switch (req.params.detailTopic) {
		case "Parameters":
			url += `/api/part/parameter/?part=${id}`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIPartParameter[]>) => {
					return response.data;
				})
				.then((response: APIPartParameter[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					res.json(response);
				});
			break;
		case "Stock":
			url += `/api/stock/?part=${id}`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIPartStock[]>) => {
					return response.data;
				})
				.then((response: APIPartStock[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					res.json(Map.mapPartStock(response));
				});
			break;

		default:
			throw new Error("No/wrong topic provided.");
	}
};
