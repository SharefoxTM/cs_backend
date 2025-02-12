import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import Map from "../../../../helpers/mapItems.helper";
import { Part } from "../../../../models/Part.model";
import { inventree } from "../../../../server";
import {
	APIPaginationPart,
	APIPart,
	PartQuery,
} from "../../../../models/Part.model";
import { ajv } from "../../../../middleware/Ajv/validator";

export const getAllParts: Handler = (req, res) => {
	const validate = ajv.getSchema("GET /parts")!;
	if (!validate(req.query)) {
		return res.status(400).json(validate.errors);
	}
	inventree
		.get(`api/part/`, {
			params: req.query,
		})
		.then((response: AxiosResponse) => {
			if (req.query.limit)
				return res.json(
					Map.mapPaginationParts(response.data as APIPaginationPart),
				);
			res.json(Map.mapParts(response.data as APIPart[]));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getPaginatedParts: Handler = (req, res) => {
	const validate = ajv.getSchema("GET /parts")!;
	if (!validate(req.query)) {
		return res.status(400).json(validate.errors);
	}
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
