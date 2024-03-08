import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const getFile: Handler = (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ error: "No ID found!" });
	}

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
	if (!req.params.id) {
		return res.status(400).json({ error: "No ID found!" });
	}

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
