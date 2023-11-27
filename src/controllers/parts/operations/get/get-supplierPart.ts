import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import Map from "../../../../helpers/mapItems";
import { APISupplierPart } from "../../../../models/SupplierPart/API/APISupplierPart.model";

export const getSupplierPart: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const url = process.env.DB_HOST + `/api/company/part/${req.params.id}/`;
	axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APISupplierPart>) => {
			return response.data;
		})
		.then((response: APISupplierPart) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(Map.mapSupplierPart(response));
		});
};
