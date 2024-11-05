import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";
import S from "../../resources";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";
import { getPrinters } from "unix-print";

export const createReel: Handler = (req, res) => {
	const width = req.body.width;
	const qty = req.body.qty;
	const sp = req.body.sp;
	const ip = req.body.ip;
	storage
		.storeReel(ip, width)
		.then((response) => {
			const row = response.data.row,
				slot = response.data.slot;
			const locationBody = {
				ip: ip,
				row: row.toString(),
				slot: slot.toString(),
				width: width.toString(),
			};
			S.findOrCreateLocation(locationBody)
				.then((location: number) => {
					const body = {
						location: location,
						part: req.body.part,
						quantity: qty,
						supplier_part: sp,
					};

					inventree
						.post(`api/stock/`, body)
						.then((resp: AxiosResponse) => {
							S.createLabel(resp.data.pk);
							res.status(response.status).json({ message: resp.data });
						})
						.catch((err: AxiosError) =>
							res.status(err.response?.status || 400).json(err.response),
						);
				})
				.catch((err: AxiosError) =>
					res.status(err.response?.status || 400).json(err.response?.data),
				);
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
			.catch((e: StorageResult) => res.status(e.status).json(e.data));
	} else res.status(400).json("No pk defined!");
};

export const printLabel: Handler = (req, res) => {
	S.createLabel(req.body.pk);

	res.status(200).json({ message: "Done" });
};
