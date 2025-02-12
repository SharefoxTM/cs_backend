import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/StorageResult.model";
import { AxiosError } from "axios";

export const updateMode: Handler = (req, res) => {
	//TODO: check response
	if (req.body.ip && req.body.mode) {
		storage
			.updateMode(req.body.ip, req.body.mode)
			.then((resp: StorageResult) => {
				res.status(resp.status).json(resp);
			})
			.catch((error: StorageResult) => {
				res.status(error.status || 500).json(error);
			});
	} else res.status(400).json("Data incorrect!");
};
