import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const getStockitem: Handler = (req, res) => {
	inventree
		.get(`api/stock/${req.params.id}/`)
		.then((resp: AxiosResponse) => res.json(resp.data))
		.catch((err: AxiosError) => res.status(400).json({ message: err.message }));
};
