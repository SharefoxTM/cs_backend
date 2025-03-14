import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation, MovingStock } from "../../../../models/Stock.model";
import storage from "../../../../middleware/Storage/storage";
import { inventree, selfAccess } from "../../../../server";
import validator from "../../../../helpers/validateItems.helper";
import { StorageResult } from "../../../../models/StorageResult.model";

const getLowestAvailable = (
	apiloc: APIStockLocation[],
): MovingStock | undefined => {
	const validLocations = apiloc.filter((loc) => {
		if (
			loc.location_detail.name !== "Moving" &&
			loc.location_detail.name !== "Fox PNP"
		) {
			return validator.ip(loc.location_detail.pathstring.split("/")[0]);
		}
		return false;
	});
	for (const loc of validLocations) {
		const reti: MovingStock = {
			barcode_hash: loc.barcode_hash,
			batch: loc.batch,
			delete_on_deplete: loc.delete_on_deplete,
			location_detail_pathstring: loc.location_detail.pathstring,
			pk: loc.pk,
			quantity: loc.quantity,
			serial: loc.serial,
			status: loc.status,
			status_text: loc.status_text,
			supplier_part_SKU:
				loc.supplier_part_detail !== null ? loc.supplier_part_detail.SKU : "",
		};
		return reti;
	}
};

export const getReel: Handler = (req, res) => {
	const [partID, location] = req.params.ID_Location.split("_");
	inventree
		.get(
			`api/stock/?location_detail=true&part=${partID}&supplier_part_detail=true&ordering=quantity`,
		)
		.then((response: AxiosResponse<APIStockLocation[]>) => {
			const stock: MovingStock | undefined = getLowestAvailable(response.data);

			if (stock !== undefined) {
				storage
					.retrieveReel(stock.location_detail_pathstring)
					.then((resp: StorageResult) => {
						if (
							resp.status === 200 ||
							resp.data === "Error: already taken out!"
						) {
							selfAccess
								.put(`company/part/${stock.pk}/${location}`)
								.then(() => {
									res.json(resp);
								})
								.catch((err: AxiosError) =>
									res
										.status(err.response?.status || 400)
										.json(err.response?.data),
								);
						}
					});
			} else {
				res.status(403).json("No available reel found");
			}
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getReelByLocation: Handler = (req, res) => {
	const ip = req.params.ip,
		row = req.params.row,
		slot = req.params.slot,
		width = req.params.width;
	const location = `${ip}/${row}/${slot}/${width}`;
	storage
		.retrieveReel(location)
		.then((response: StorageResult) =>
			res.status(response.status).json(response),
		)
		.catch((err) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
