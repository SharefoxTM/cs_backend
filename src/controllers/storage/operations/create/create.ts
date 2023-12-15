import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APILocation } from "../../../../models/Location/APILocation.model";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";
import { findOrCreateLocation } from "../../resources";

export const createReel: Handler = async (req, res, next) => {
	const width = req.body.newReelSelectWidth;
	const qty = req.body.newReelQty;
	const sp = req.body.newReelSelectSP;
	const ip = await axios
		.get(
			`${process.env.DB_HOST}/api/stock/location/${req.body.newReelSelectIP}/`,
			{
				headers: {
					Authorization: process.env.DB_TOKEN,
				},
			},
		)
		.then((response: AxiosResponse<APILocation>) => response.data.name);

	let response: StorageResult = await storage.storeReel(ip, width);

	if (response.status !== 200) {
		res.status(response.status).json({ error: response.data });
	} else {
		const { row, slot } = JSON.parse(response.data);
		const locationBody = {
			ip: ip,
			row: row,
			slot: slot,
			width: width,
		};

		const location = await findOrCreateLocation(locationBody, response);
		if (!location) {
			res.status(response.status).json({ message: response.data });
		} else {
			const body = {
				location: location as number,
				part: req.body.part,
				quantity: qty,
				supplier_part: sp,
			};
			response.data = await axios
				.post(`${process.env.DB_HOST}/api/stock/`, body, {
					headers: {
						Authorization: process.env.DB_TOKEN,
					},
				})
				.then((resp) => resp.data);
			res.status(response.status).json({ message: response.data });
		}
	}
};

export const initStorage: Handler = (req, res, next) => {
	if (req.body.pk) {
		storage.initialiseStorage(req.body.pk);
		res.status(200).json({ init: "Succes!" });
	} else res.status(400).json({ init: "No pk defined!" });
};
