import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation } from "../../../../models/Stock/APIStockLocation.model";
import Map from "../../../../helpers/mapItems.helper";

export const getReelList: Handler = (req, res, next) => {
	axios
		.get(
			`${process.env.DB_HOST}/api/stock/?location_detail=true&location=12&part=${req.params.ID}&supplier_part_detail=true`,
			{
				headers: {
					Authorization: process.env.DB_TOKEN,
				},
			},
		)
		.then((response: AxiosResponse<APIStockLocation[]>) => response.data)
		.then((response: APIStockLocation[]) =>
			res.json(Map.mapMovingStock(response)),
		);
};
