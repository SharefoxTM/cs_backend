import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIPart } from "../../../../models/Part/APIPart.model";
import Map from "../../../../helpers/mapItems";
import { Part } from "../../../../models/Part/Part.model";

export const getAllParts: Handler = async (req, res, next) => {
	axios
		.get(`${process.env.DB_HOST}/api/part/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			params: req.query,
		})
		.then((response: AxiosResponse<APIPart[]>) => {
			return response.data;
		})
		.then((response: APIPart[]) => {
			res.json(Map.mapParts(response));
		});
};

export const getPaginatedParts: Handler = async (req, res, next) => {
	const page = parseInt(req.query.page?.toString() || "0") + 1;
	const pageSize = parseInt(req.query.pageSize?.toString() || "25");
	const startIndex = (page - 1) * pageSize;
	const endIndex = page * pageSize;
	const parts: Part[] = await axios
		.get(`${process.env.DB_HOST}/api/part/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			params: req.query,
		})
		.then((response: AxiosResponse<APIPart[]>) => {
			return response.data;
		})
		.then((response: APIPart[]) => {
			return Map.mapParts(response);
		});
	const paginatedParts = parts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(parts.length / pageSize);

	res.json({ data: paginatedParts, totalPages });
};
