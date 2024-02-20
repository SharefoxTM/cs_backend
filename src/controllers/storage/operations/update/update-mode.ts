import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";
import { AxiosResponse } from "axios";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";

export const updateMode: Handler = (req, res) => {
	//TODO: check response
	if (req.body.ip && req.body.mode) {
		storage
			.updateMode(req.body.ip, req.body.mode)
			.then((resp: StorageResult) => {
				res.status(resp.status).json(resp.data);
			})
			.catch((error) => {
				res.status(400).json(error);
			});
	} else res.status(400).json("Data incorrect!");
};
