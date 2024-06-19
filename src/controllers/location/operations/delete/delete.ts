import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const deleteCategory: Handler = (req, res) => {
	if (req.headers.authorization === process.env.DELETE_TOKEN) {
		inventree
			.delete(`api/stock/location/${req.body.pk}/`)
			.then((response: AxiosResponse) => {
				res.status(204).json(response.data);
			})
			.catch((err: AxiosError) =>
				res.status(err.response?.status || 400).json(err),
			);
		return;
	}
	res.status(403).json("Tokens do not match!");
};
