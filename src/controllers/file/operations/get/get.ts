import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const getFile: Handler = (req, res) => {
	res.type("img/jpeg");
	inventree
		.get(`${req.params.folder}/${req.params.type}/${req.params.id}`, {
			responseType: "stream",
		})
		.then((response: AxiosResponse) => response.data.pipe(res))
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getLabel: Handler = (req, res) => {
	res.type("application/pdf");
	inventree
		.get(`media/label/output/${req.params.id}`, {
			responseType: "stream",
		})
		.then((response: AxiosResponse) => response.data.pipe(res))
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getThumb: Handler = (req, res) => {
	res.type("img/jpeg");
	inventree
		.get(`media/part_images/${req.params.image}`, {
			responseType: "stream",
		})
		.then((response: AxiosResponse) => response.data.pipe(res))
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 500).json(err.response?.data),
		);
};
