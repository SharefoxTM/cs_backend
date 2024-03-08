import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APIPart } from "../../../../models/Part/APIPart.model";
import Map from "../../../../helpers/mapItems.helper";
import { Part } from "../../../../models/Part/Part.model";
import { inventree } from "../../../../server";

export const getAllParts: Handler = (req, res) => {
	inventree
		.get(`api/part/`, {
			params: req.query,
		})
		.then((response: AxiosResponse<APIPart[]>) => {
			res.json(Map.mapParts(response.data));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getPaginatedParts: Handler = (req, res) => {
	const page = parseInt(req.query.page?.toString() || "0") + 1;
	const pageSize = parseInt(req.query.pageSize?.toString() || "25");
	const startIndex = (page - 1) * pageSize;
	const endIndex = page * pageSize;
	inventree
		.get(`api/part/`, {
			params: req.query,
		})
		.then((response: AxiosResponse<APIPart[]>) => {
			return Map.mapParts(response.data);
		})
		.then((parts: Part[]) => {
			const paginatedParts = parts.slice(startIndex, endIndex);
			const totalPages = Math.ceil(parts.length / pageSize);

			res.json({ data: paginatedParts, totalPages });
		})
		.catch((error: AxiosError) => {
			res.status(error.response?.status || 400).json(error.response?.data);
		});
};

export const getParameterTemplates: Handler = (req, res) => {
	inventree
		.get("api/part/parameter/template/")
		.then((resp: AxiosResponse) => res.json(resp.data))
		.catch((error: AxiosError) => {
			res.status(error.response?.status || 400).json(error.response?.data);
		});
};
