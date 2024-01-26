import axios, { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation } from "../../../../models/Stock/APIStockLocation.model";
import Map from "../../../../helpers/mapItems.helper";
import { inventree } from "../../../../server";

export const getReelList: Handler = (req, res) => {
	inventree
		.get(
			`api/stock/?location_detail=true&location=12&part=${req.params.ID}&supplier_part_detail=true`,
		)
		.then((response: AxiosResponse<APIStockLocation[]>) =>
			res.json(Map.mapMovingStock(response.data)),
		)
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response),
		);
};
