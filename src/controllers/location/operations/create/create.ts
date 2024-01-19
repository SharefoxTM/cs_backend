import { AxiosResponse } from "axios";
import { Handler } from "express";
import { inventree } from "../../../../server";

const findOrCreate = async (
	name: string,
	parent: number | null,
	structural: boolean,
): Promise<number> => {
	let params = {
		name: name,
		parent: parent,
	};

	const pk: number | undefined = await inventree
		.get(`api/stock/location/`, { params: params })
		.then(async (response: AxiosResponse<any>) => {
			if (!response.data[0]) {
				return await inventree
					.post(`api/stock/location/`, {
						name: name,
						parent: parent,
						structural: structural,
					})
					.then((response: AxiosResponse<any>) => {
						return response.data.pk as number;
					});
			} else return response.data[0].pk as number;
		});
	return pk || 0;
};

export const createLocation: Handler = async (req, res, next) => {
	const ip = req.body.ip;
	const row = req.body.row;
	const slot = req.body.slot;
	const width = req.body.width;
	let pk = await findOrCreate(ip, null, true);
	pk = await findOrCreate(row, pk, true);
	pk = await findOrCreate(slot, pk, true);
	res.json({ pk: await findOrCreate(width, pk, false) });
};
