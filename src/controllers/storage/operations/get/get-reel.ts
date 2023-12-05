import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import { APIStockLocation } from "../../../../models/Stock/APIStockLocation.model";
import { MovingStock } from "../../../../models/Stock/MovingStock.model";
import net from "net";

const getLowestAvailable = (
	apiloc: APIStockLocation[],
): MovingStock | undefined => {
	for (const loc of apiloc) {
		if (
			loc.location_detail.name !== "Moving" &&
			loc.location_detail.name !== "Fox PNP"
		) {
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
			return reti!;
		}
	}
};

export const getReel: Handler = (req, res, next) => {
	axios
		.get(
			`${process.env.DB_HOST}/api/stock/?location_detail=true&part=${req.params.ID}&supplier_part_detail=true&ordering=quantity`,
			{
				headers: {
					Authorization: process.env.DB_TOKEN,
				},
			},
		)
		.then((response: AxiosResponse<APIStockLocation[]>) => {
			return response.data;
		})
		.then((response: APIStockLocation[]) => {
			const resp: MovingStock | undefined = getLowestAvailable(response);
			if (resp !== undefined) {
				const [ip, row, slot, width] =
					resp.location_detail_pathstring.split("/");
				console.log([ip, row, slot, width]);
				const client = new net.Socket();
				client.connect(5050, ip, function () {
					client.write(
						JSON.stringify({
							type: "retrieve",
							ID: "1",
							rij: row,
							slot: slot,
							width: width,
						}),
					);
				});

				client.on("data", function (data) {
					const recv = JSON.parse(data.toString());
					console.log(recv);
					client.destroy();
				});
				client.on("error", (error) => {
					client.destroy();
					console.log(error.message);
				});
			}
			res.json(resp);
		});
};
