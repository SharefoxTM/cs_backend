import axios, { AxiosResponse } from "axios";
import { Handler } from "express";

export const createSupplierPart: Handler = async (req, res, next) => {
	console.log(req.body);
	axios
		.post(`${process.env.DB_HOST}/api/company/part/`, req.body, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse) => {
			return response.data;
		})
		.then((response: any) => {
			res.json(response);
		});
};
