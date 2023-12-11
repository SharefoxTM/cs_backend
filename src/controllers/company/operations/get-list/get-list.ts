import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APISupplierPart } from "../../../../models/Company/APISupplierPart.model";
import { APISupplier } from "../../../../models/Company/APISupplier.model";
import Map from "../../../../helpers/mapItems";

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

export const getSupplierList: Handler = (req, res, next) => {
	req.query.is_supplier = "true";
	axios
		.get(`${process.env.DB_HOST}/api/company/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			params: req.query,
		})
		.then((response: AxiosResponse<APISupplier[]>) => {
			return response.data;
		})
		.then((response: APISupplier[]) => {
			res.json(Map.mapSuppliers(response));
		});
};
