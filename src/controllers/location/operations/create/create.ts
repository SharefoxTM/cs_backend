import axios, { AxiosResponse } from "axios";
import { Handler } from "express";

const findOrCreate = async (
	name: string,
	parent: number | null,
): Promise<number> => {
	let query = `${process.env.DB_HOST}/api/stock/location/?name=${name}`;

	if (parent !== null) {
		query += `&parent=${parent}`;
	}

	const pk: number | undefined = await axios
		.get(query, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse) => {
			return response.data[0];
		})
		.then(async (response: any) => {
			if (!response) {
				return await axios
					.post(
						`${process.env.DB_HOST}/api/stock/location/`,
						{ name: name, parent: parent },
						{
							headers: {
								Authorization: process.env.DB_TOKEN,
							},
						},
					)
					.then((response: AxiosResponse) => {
						return response.data;
					})
					.then((response: any) => {
						return response.pk as number;
					});
			} else return response.pk as number;
		});
	return pk || 0;
};

export const createLocation: Handler = async (req, res, next) => {
	const ip = req.body.ip;
	const row = req.body.row;
	const slot = req.body.slot;
	const width = req.body.width;
	console.log([ip, row, slot, width]);
	let pk = await findOrCreate(ip, null);
	pk = await findOrCreate(row, pk);
	pk = await findOrCreate(slot, pk);
	res.json({ pk: await findOrCreate(width, pk) });
};
