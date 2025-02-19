import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import Map from "../../../../helpers/mapItems.helper";
import { inventree } from "../../../../server";
import { APIPaginationPart, APIPart } from "../../../../models/Part.model";
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

export const getParameterTemplates: Handler = (req, res) => {
	inventree
		.get("api/part/parameter/template/")
		.then((resp: AxiosResponse) => res.json(resp.data))
		.catch((error: AxiosError) => {
			res.status(error.response?.status || 400).json(error.response?.data);
		});
};
