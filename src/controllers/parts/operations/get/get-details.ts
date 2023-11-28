import { Handler } from "express";
import { AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems";
import { APIPartParameter } from "../../../../models/Parameters/APIPartParameter.model";
import { APIPartStock } from "../../../../models/Stock/APIPartStock.model";
import { APIBuildOrder } from "../../../../models/BuildOrders/APIBuildOrder.model";

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
			url += `/api/stock/?part=${id}&supplier_part_detail=true&location_detail=true`;
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
					res.json(Map.mapStock(response));
				});
			break;
		case "Build Orders":
			url += `/api/build/item/?part=${req.params.id}&build_detail=true&stock_detail=false&location_detail=false&part_detail=false`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIBuildOrder[]>) => {
					return response.data;
				})
				.then((response: APIBuildOrder[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					console.log(response);
					res.json(Map.mapBuildOrders(response));
				});
			break;

		default:
			throw new Error("No/wrong topic provided.");
	}
};
