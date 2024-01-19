import axios, { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";

export const deletePart: Handler = (req, res, next) => {
	axios
		.delete(`${process.env.DB_HOST}/api/part/${req.params.id}/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse) =>
			res.status(response.status).json(response.data),
		)
		.catch((err: AxiosError) => res.status(405).json(err));
};
