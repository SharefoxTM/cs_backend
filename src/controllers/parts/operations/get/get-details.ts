import { Handler } from "express";
import { AxiosError, AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems.helper";
import { APIPartParameter } from "../../../../models/Parameter.model";
import { APIPartStock } from "../../../../models/Stock.model";
import { APIUsedIn } from "../../../../models/UsedIn.model";
import { inventree } from "../../../../server";

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

		default:
			res.status(400).json({ error: "No/wrong topic provided." });
	}
};
