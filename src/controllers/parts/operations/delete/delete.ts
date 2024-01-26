import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { inventree } from "../../../../server";

export const deletePart: Handler = (req, res) => {
	inventree
		.delete(`api/part/${req.params.id}/`)
		.then((response: AxiosResponse) =>
			res.status(response.status).json(response.data),
		)
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
