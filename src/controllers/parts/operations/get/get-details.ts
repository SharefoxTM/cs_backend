import { Handler } from "express";
import axios, { AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems.helper";
import { APIPartParameter } from "../../../../models/Parameters/APIPartParameter.model";
import { APIPartStock } from "../../../../models/Stock/APIPartStock.model";
import { APIBuildOrder } from "../../../../models/BuildOrder/APIBuildOrder.model";
import { APIUsedIn } from "../../../../models/UsedIn/APIUsedIn.model";
// import { APIPartInternalPrice } from "../../../../models/Part/APIPartInternalPrice.model";
// import { APIOrderPOLine } from "../../../../models/Order/APIOrderPOLine.model";

export const getDetails: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const id = req.params.id;
	let url = process.env.DB_HOST!;
	switch (req.params.detailTopic) {
		case "Parameters":
			url += `/api/part/parameter/?part=${id}`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIPartParameter[]>) => {
					return response.data;
				})
				.then((response: APIPartParameter[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					res.json(response);
				});
			break;
		case "Stock":
			url += `/api/stock/?part=${id}&supplier_part_detail=true&location_detail=true`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIPartStock[]>) => {
					return response.data;
				})
				.then((response: APIPartStock[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					res.json(Map.mapStock(response));
				});
			break;
		case "Build Orders":
			url += `/api/build/item/?part=${req.params.id}&build_detail=true&stock_detail=false&location_detail=false&part_detail=false`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIBuildOrder[]>) => {
					return response.data;
				})
				.then((response: APIBuildOrder[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					res.json(Map.mapBuildOrders(response));
				});
			break;
		case "Used In":
			url += `/api/bom/?search=&uses=${req.params.id}&part_detail=true&sub_part_detail=true`;
			axios
				.get(url, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((response: AxiosResponse<APIUsedIn[]>) => {
					return response.data;
				})
				.then((response: APIUsedIn[]) => {
					res.header("Access-Control-Allow-Origin", "*");
					res.json(Map.mapUsedIn(response));
				});
			break;
		// case "Pricing-IP":
		// 	url += `/api/part/internal-price/?part=${req.params.id}`;
		// 	axios
		// 		.get(url, {
		// 			headers: {
		// 				Authorization: process.env.DB_TOKEN,
		// 			},
		// 		})
		// 		.then((response: AxiosResponse<APIPartInternalPrice>) => {
		// 			return response.data;
		// 		})
		// 		.then((response: APIPartInternalPrice) => {
		// 			res.header("Access-Control-Allow-Origin", "*");
		// 			res.json(response);
		// 		});
		// 	break;
		// case "Pricing-PO":
		// 	url += `/api/order/po-line/?base_part=${req.params.id}&part_detail=true&order_detail=true&has_pricing=true&order_status=30`;
		// 	axios
		// 		.get(url, {
		// 			headers: {
		// 				Authorization: process.env.DB_TOKEN,
		// 			},
		// 		})
		// 		.then((response: AxiosResponse<APIOrderPOLine[]>) => {
		// 			return response.data;
		// 		})
		// 		.then((response: APIOrderPOLine[]) => {
		// 			res.header("Access-Control-Allow-Origin", "*");
		// 			res.json(response);
		// 		});
		// 	break;
		// case "Pricing-PB":
		// 	url += `/api/company/price-break/?base_part=${req.params.id}&supplier_detail=true&part_detail=true`;
		// 	axios
		// 		.get(url, {
		// 			headers: {
		// 				Authorization: process.env.DB_TOKEN,
		// 			},
		// 		})
		// 		.then((response: AxiosResponse<APIUsedIn[]>) => {
		// 			return response.data;
		// 		})
		// 		.then((response: APIUsedIn[]) => {
		// 			res.header("Access-Control-Allow-Origin", "*");
		// 			res.json(Map.mapUsedIn(response));
		// 		});
		// 	break;

		default:
			throw new Error("No/wrong topic provided.");
	}
};
