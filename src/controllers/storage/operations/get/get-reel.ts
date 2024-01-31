import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation } from "../../../../models/Stock/APIStockLocation.model";
import { MovingStock } from "../../../../models/Stock/MovingStock.model";
import storage from "../../../../middleware/Storage/storage";
import { inventree } from "../../../../server";
import validator from "../../../../helpers/validateItems.helper";

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
	inventree
		.get(
			`api/stock/?location_detail=true&part=${req.params.ID}&supplier_part_detail=true&ordering=quantity`,
		)
		.then((response: AxiosResponse<APIStockLocation[]>) => {
			console.log(response.data);
			const resp: MovingStock | undefined = getLowestAvailable(response.data);

			if (resp !== undefined) {
				storage.retrieveReel(resp.location_detail_pathstring);
				//TODO: update stock location to moving
			}
			res.json(resp);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
