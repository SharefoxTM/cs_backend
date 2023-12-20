import { Handler } from "express";
import axios, { AxiosResponse } from "axios";
import { APIPart } from "../../../../models/Part/APIPart.model";
import Map from "../../../../helpers/mapItems.helper";

export const getPart: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	axios
		.get(`${process.env.DB_HOST}/api/part/${req.params.id}/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APIPart>) => {
			return response.data;
		})
		.then((response: APIPart) => {
			res.json(Map.mapPart(response));
		});
};
