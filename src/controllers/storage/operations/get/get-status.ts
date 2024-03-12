import { AxiosError } from "axios";
import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";

export const getStatus: Handler = (req, res) => {
	storage
		.getStatus(req.body.ip, req.body.row)
		.then((resp: StorageResult) => {
			res.status(resp.status).json(resp);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 500).json(err),
		);
};
