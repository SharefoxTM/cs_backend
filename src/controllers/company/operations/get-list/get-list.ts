import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APISupplierPart } from "../../../../models/SupplierPart/APISupplierPart.model";

export const getSupplierPartList: Handler = (req, res, next) => {
	axios
		.get(`${process.env.DB_HOST}/api/company/part/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			params: req.query,
		})
		.then((response: AxiosResponse<APISupplierPart[]>) => {
			return response.data;
		})
		.then((response: APISupplierPart[]) => {
			res.json(response);
		});
};
