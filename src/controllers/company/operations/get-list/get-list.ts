import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APISupplierPart } from "../../../../models/SupplierPart.model";
import { APISupplier } from "../../../../models/Supplier.model";
import Map from "../../../../helpers/mapItems.helper";
import { inventree } from "../../../../server";

export const getSupplierPartList: Handler = (req, res) => {
	inventree
		.get(`api/company/part/`, {
			params: req.query,
		})
		.then((response: AxiosResponse<APISupplierPart[]>) => {
			res.json(response.data);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getSupplierList: Handler = (req, res) => {
	inventree
		.get(`api/company/`, {
			params: { ...req.query, is_supplier: true },
		})
		.then((response: AxiosResponse<APISupplier[]>) => {
			res.json(Map.mapSuppliers(response.data));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
