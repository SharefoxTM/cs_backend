import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";
import S from "../../resources";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const createReel: Handler = (req, res) => {
	const width = req.body.reelSelectWidth;
	const qty = req.body.reelQty;
	const sp = req.body.supplier_part;
	const ip = req.body.ip;

	storage
		.storeReel(ip, width)
		.then((response: StorageResult) => {
			if (response.status) {
				res.status(response.status || 400).json(response);
			} else {
				const { row, slot } = JSON.parse(response.data);
				const locationBody = {
					ip: ip,
					row: row,
					slot: slot,
					width: width,
				};
				S.findOrCreateLocation(locationBody)
					.then((location: number) => {
						const body = {
							location: location,
							part: req.body.part.value,
							quantity: qty,
							supplier_part: sp,
						};

						inventree
							.post(`api/stock/`, body)
							.then((resp: AxiosResponse) =>
								res.status(response.status).json({ message: resp.data }),
							)
							.catch((err: AxiosError) =>
								res.status(err.response?.status || 400).json(err.response),
							);
					})
					.catch((err: AxiosError) =>
						res.status(err.response?.status || 400).json(err.response?.data),
					);
			}
		})
		.catch((err: Error) => {
			res.status(400).json({ message: err.message });
		});
};

export const initStorage: Handler = (req, res) => {
	if (req.body.pk) {
		storage
			.initialiseStorage(req.body.pk)
			.then((resp: StorageResult) => res.status(resp.status).json(resp.data))
			.catch((e: AxiosError) =>
				res.status(e.response?.status || 400).json(e.response?.data),
			);
	} else res.status(400).json("No pk defined!");
};
