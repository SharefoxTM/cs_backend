import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";
import { APIStock } from "../../../../models/Stock.model";

export const setMoving: Handler = (req, res) => {
	inventree
		.get(`api/stock/${req.params.partID}/`)
		.then((response: AxiosResponse<APIStock>) => {
			response.data.location = req.params.location === "Moving" ? 33 : 13;
			inventree
				.put(`api/stock/${req.params.partID}/`, response.data)
				.then((response: AxiosResponse) => {
					res.json(response.data);
				})
				.catch((err: AxiosError) =>
					res.status(err.response?.status || 400).json(err.response),
				);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response),
		);
};
