import { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIPart } from "../../../../models/APIPart.model";

const axios = require("axios");
require("dotenv").config();

const getPartImgURL = async (id: string): Promise<string> => {
	const part = await axios
		.get(process.env.DB_HOST + `/api/part/${id}/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APIPart>) => {
			return response.data;
		})
		.then((response: APIPart) => {
			return response;
		});
	return part.image;
};

// export const getImage: Handler = async (req, res, next) => {
// 	if (!req.params.id) {
// 		res.status(400).json("no ID found!");
// 	}

// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.type("img/jpeg");
// 	const img = await getPartImgURL(req.params.id);
// 	if (!img) {
// 		res.send("");
// 	} else {
// 		const url = process.env.DB_HOST + img;

// 		const image = await axios
// 			.get(url, {
// 				headers: {
// 					Authorization: process.env.DB_TOKEN,
// 				},
// 			})
// 			.then((response: AxiosResponse<Blob>) => {
// 				return response.data;
// 			});
// 		res.send(image);
// 	}
// };
export const getImage: Handler = async (req, res, next) => {
	if (!req.params.id) {
		return res.status(400).json({ error: "No ID found!" });
	}

	res.header("Access-Control-Allow-Origin", "*");
	res.type("img/jpeg");
	try {
		const img = await getPartImgURL(req.params.id);
		if (!img) {
			return res.status(404).send("");
		}

		const url = process.env.DB_HOST + img;

		const response = await axios.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			responseType: "stream", // Stream the response
		});

		response.data.pipe(res); // Stream the image directly to the response
	} catch (error) {
		console.error("Error fetching image:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
