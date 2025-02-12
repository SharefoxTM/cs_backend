import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation } from "../../../../models/Stock.model";
import Map from "../../../../helpers/mapItems.helper";
import { inventree } from "../../../../server";
import { getPrinters } from "unix-print";

export const getReelList: Handler = (req, res) => {
	inventree
		.get(
			`api/stock/?location_detail=true&location=12&part=${req.params.ID}&supplier_part_detail=true`,
		)
		.then((response: AxiosResponse<APIStockLocation[]>) =>
			res.json(Map.mapMovingStock(response.data)),
		)
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getPrinterList: Handler = (req, res) => {
	getPrinters()
		.then((resp: any) => res.status(200).json(resp))
		.catch(console.log);
};
