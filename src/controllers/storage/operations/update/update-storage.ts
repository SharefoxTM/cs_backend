import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";
import S from "../../resources";
import { inventree, selfAccess } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const patchReel: Handler = (req, res) => {
	const ip: string = req.body.ip;
	const qr: number = req.body.qr;
	const width: number = req.body.width;
	selfAccess.get(`stock/${qr}/`).then((resp: AxiosResponse) => {
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
						let body = { location: location.toString() };

						inventree
							.patch(`api/stock/${qr}/`, body)
							.then((resp: AxiosResponse) => {
							S.createLabel(resp.data.pk);
								res.status(response.status).json({ message: resp.data });
							})
							.catch((err: AxiosError) =>
								res
									.status(err.response?.status || 400)
									.json(err.response),
							);
					})
					.catch((err: AxiosError) =>
						res.status(err.response?.status || 400).json(err.response?.data),
					);
			})
			.catch((err: Error) => {
				res.status(400).json({ message: err.message });
			});
	});
	// storage
	// 	.storeReel(ip, width)
	// 	.then((response: StorageResult) => {
	// 		const { row, slot } = JSON.parse(response.data);
	// 		const locationBody = {
	// 			ip: ip,
	// 			row: row,
	// 			slot: slot,
	// 			width: width,
	// 		};
	// 		S.findOrCreateLocation(locationBody)
	// 			.then((location: number) => {
	// 				const body = {
	// 					location: location,
	// 					part: req.body.part.value,
	// 					quantity: qty,
	// 					supplier_part: sp,
	// 				};

	// 				inventree
	// 					.post(`api/stock/`, body)
	// 					.then((resp: AxiosResponse) => {
	// 						S.createLabel(resp.data.pk);
	// 						res.status(response.status).json({ message: resp.data });
	// 					})
	// 					.catch((err: AxiosError) =>
	// 						res.status(err.response?.status || 400).json(err.response),
	// 					);
	// 			})
	// 			.catch((err: AxiosError) =>
	// 				res.status(err.response?.status || 400).json(err.response?.data),
	// 			);
	// 	})
	// 	.catch((err: Error) => {
	// 		res.status(400).json({ message: err.message });
	// 	});
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

export const printLabel: Handler = (req, res) => {
	S.createLabel(req.body.pk);

	res.status(400).json({ message: "Not implemented yet" });
};
