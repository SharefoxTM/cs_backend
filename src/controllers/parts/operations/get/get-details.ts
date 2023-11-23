import { Handler, response } from "express";
import { urlPart } from "../../resources";
import { AxiosResponse } from "axios";
import Map from "../../../../helpers/mapItems";
import { APIPartParameter } from "../../../../models/APIPartParameter.model";

const axios = require("axios");
require("dotenv").config();

const getDetailsUrl = (id: string, topic: string) => {
	let url = urlPart;
	switch (topic) {
		case "Parameters":
			url += `parameter/?part=${id}`;
			break;

		default:
			throw new Error("No/wrong topic provided.");
			break;
	}
	return url;
};

export const getDetails: Handler = (req, res, next) => {
	if (!req.params.id) {
		throw new Error("Invalid id");
	}
	const url = getDetailsUrl(req.params.id, req.params.detailTopic);
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
};
