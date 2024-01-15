import axios, { AxiosResponse } from "axios";
import { Handler } from "express";

export const createPart: Handler = async (req, res, next) => {
	axios
		.post(`${process.env.DB_HOST}/api/part/`, req.body, {
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
