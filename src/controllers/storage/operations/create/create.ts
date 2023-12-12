import axios, { AxiosResponse } from "axios";
import { Handler } from "express";
import net from "net";
import { APILocation } from "../../../../models/Location/APILocation.model";
import storage from "../../../../middleware/Storage/storage";
import { StorageResult } from "../../../../models/Storage/StorageResult.model";

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
		.then((response: AxiosResponse<APILocation>) => {
			return response.data.name;
		});
	const response: StorageResult = await storage.storeReel({ ip, width });

	console.log(response);
	// const client = new net.Socket();
	// client.connect(5050, ip, function () {
	// 	client.write(JSON.stringify({ type: "store", ID: "3", width: width }));
	// });

	// client.on("data", async function (data) {
	// 	const recv = JSON.parse(data.toString());
	// 	console.log(recv);

	// 	if (recv.type === "error") {
	// 		res.status(400).json({ error: recv.error });
	// 	} else {
	// 		if (recv.out_come === "geen plaats") {
	// 			res.status(400).json({ error: "No slots available!" });
	// 		} else {
	// 			const row = recv.slots[0].rij;
	// 			const slot = recv.slots[0].slot;
	// 			const locationBody = {
	// 				ip: ip,
	// 				row: row,
	// 				slot: slot,
	// 				width: width,
	// 			};
	// 			const location = await axios
	// 				.post(`${process.env.SELF}location/`, locationBody)
	// 				.then((resp: AxiosResponse) => resp.data);
	// 			const body = {
	// 				location: await location.pk,
	// 				part: req.body.part,
	// 				quantity: qty,
	// 				supplier_part: sp,
	// 			};
	// 			axios
	// 				.post(`${process.env.DB_HOST}/api/stock/`, body, {
	// 					headers: {
	// 						Authorization: process.env.DB_TOKEN,
	// 					},
	// 				})
	// 				.then((resp) => {
	// 					return resp.data;
	// 				})
	// 				.then((data) => res.json(data));
	// 		}
	// 	}
	// 	client.destroy();
	// });
	// client.on("error", (error) => {
	// 	client.destroy();
	// 	console.log(error.message);
	// });
};
