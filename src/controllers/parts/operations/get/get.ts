import { Handler } from "express";
import { AxiosError, AxiosResponse } from "axios";
import { APIPart } from "../../../../models/Part.model";
import Map from "../../../../helpers/mapItems.helper";
import { inventree } from "../../../../server";

export const getPart: Handler = (req, res) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	inventree
		.get(`api/part/${req.params.id}/`)
		.then((response: AxiosResponse<APIPart>) => {
			res.json(Map.mapPart(response.data));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getParameterTemplate: Handler = (req, res) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	inventree
		.get(`api/part/parameter/template/${req.params.id}/`)
		.then((response: AxiosResponse) => {
			res.json(response.data);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
