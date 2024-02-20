import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation } from "../../../../models/Stock/APIStockLocation.model";
import { MovingStock } from "../../../../models/Stock/MovingStock.model";
import storage from "../../../../middleware/Storage/storage";
import { inventree, selfAccess } from "../../../../server";
import validator from "../../../../helpers/validateItems.helper";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";

export const getStatus: Handler = (req, res) => {
	storage.getStatus(req.body.ip, req.body.row).then((resp: StorageResult) => {
		console.log(resp);
		res.status(resp.status).json(resp);
	});
};
