import { Handler } from "express";
import { APILocation } from "../../../../models/Location/APILocation.model";
import axios, { AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems";

export const getStorageIPs: Handler = (req, res, next) => {
	axios
		.get(`${process.env.DB_HOST}/api/stock/location/?parent=null`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APILocation[]>) => {
			return response.data;
		})
		.then(async (response: APILocation[]) => {
			res.json(Map.mapIPs(response));
		});
};
