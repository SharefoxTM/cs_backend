import { Handler } from "express";
import Map from "../../../../helpers/mapItems.helper";
import { APIPart } from "../../../../models/Part/APIPart.model";
import axios, { AxiosResponse } from "axios";

export const updatePart: Handler = (req, res, next) => {
	axios
		.put(`${process.env.DB_HOST}/api/part/`, {
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
