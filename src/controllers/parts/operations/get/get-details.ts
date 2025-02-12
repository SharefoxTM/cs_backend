import { Handler } from "express";
import { AxiosError, AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems.helper";
import { APIPartParameter } from "../../../../models/Parameter.model";
import { APIPartStock } from "../../../../models/Stock.model";
import { APIBuildOrder } from "../../../../models/BuildOrder.model";
import { APIUsedIn } from "../../../../models/UsedIn.model";
import { inventree } from "../../../../server";
// import { APIPartInternalPrice } from "../../../../models/Part/APIPartInternalPrice.model";
// import { APIOrderPOLine } from "../../../../models/Order/APIOrderPOLine.model";

export const getDetails: Handler = (req, res) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const id = req.params.id;
	switch (req.params.detailTopic) {
		case "Parameters":
			inventree
				.get(`api/part/parameter/?part=${id}`)
				.then((response: AxiosResponse<APIPartParameter[]>) =>
					res.json(response.data),
				)
				.catch((err: AxiosError) =>
					res.status(err.response?.status || 400).json(err.response),
				);
			break;
		case "Stock":
			inventree
				.get(
					`/api/stock/?part=${id}&supplier_part_detail=true&location_detail=true`,
				)
				.then((response: AxiosResponse<APIPartStock[]>) =>
					res.json(Map.mapStock(response.data)),
				)
				.catch((err: AxiosError) =>
					res.status(err.response?.status || 400).json(err.response),
				);
			break;
		case "Build Orders":
			inventree
				.get(
					`/api/build/item/?part=${id}&build_detail=true&stock_detail=false&location_detail=false&part_detail=false`,
				)
				.then((response: AxiosResponse<APIBuildOrder[]>) =>
					res.json(Map.mapBuildOrders(response.data)),
				)
				.catch((err: AxiosError) =>
					res.status(err.response?.status || 400).json(err.response),
				);
			break;
		case "Used In":
			inventree
				.get(
					`/api/bom/?search=&uses=${id}&part_detail=true&sub_part_detail=true`,
				)
				.then((response: AxiosResponse<APIUsedIn[]>) =>
					res.json(Map.mapUsedIn(response.data)),
				)
				.catch((err: AxiosError) =>
					res.status(err.response?.status || 400).json(err.response),
				);
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
