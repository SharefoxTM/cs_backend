import { Handler } from "express";
import { APILocation } from "../../../../models/Location/APILocation.model";
import { AxiosError, AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems.helper";
import { inventree } from "../../../../server";

export const getStorageIPs: Handler = (req, res, next) => {
	inventree
		.get(`api/stock/location/?parent=null`)
		.then(async (response: AxiosResponse<APILocation[]>) => {
			res.json(Map.mapIPs(response.data));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response),
		);
};
