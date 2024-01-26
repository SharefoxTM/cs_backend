import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { inventree } from "../../../../server";
import { APILocation } from "../../../../models/Location/APILocation.model";

const findOrCreate = (
	name: string,
	parent: number | null,
	structural: boolean,
): Promise<number> => {
	const params = {
		name: name,
		parent: parent,
	};
	return new Promise<number>((resolve, reject) => {
		inventree
			.get(`api/stock/location/`, { params: params })
			.then((response: AxiosResponse<APILocation[]>) => {
				if (!response.data[0]) {
					inventree
						.post(`api/stock/location/`, {
							name: name,
							parent: parent,
							structural: structural,
						})
						.then((response: AxiosResponse<APILocation>) => {
							resolve(response.data.pk as number);
						})
						.catch((e: AxiosError) => reject(e));
				} else resolve(response.data[0].pk as number);
			})
			.catch((e: AxiosError) => reject(e));
	});
};

export const createLocation: Handler = (req, res) => {
	const ip = req.body.ip;
	const row = req.body.row;
	const slot = req.body.slot;
	const width = req.body.width;
	findOrCreate(ip, null, true)
		.then((pk: number) => {
			findOrCreate(row, pk, true)
				.then((pk: number) => {
					findOrCreate(slot, pk, true)
						.then((pk: number) => {
							findOrCreate(width, pk, true)
								.then((pk: number) => {
									res.json({ pk: pk });
								})
								.catch((e: AxiosError) =>
									res.status(e.response?.status || 400).json(e.response),
								);
						})
						.catch((e: AxiosError) =>
							res.status(e.response?.status || 400).json(e.response),
						);
				})
				.catch((e: AxiosError) =>
					res.status(e.response?.status || 400).json(e.response),
				);
		})
		.catch((e: AxiosError) =>
			res.status(e.response?.status || 400).json(e.response),
		);
};
