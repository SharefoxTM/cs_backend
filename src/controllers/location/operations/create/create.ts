import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { inventree } from "../../../../server";
import { APILocation } from "../../../../models/Location/APILocation.model";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import {
	NewLocation,
	NewStorage,
} from "../../../../models/Location/NewLocation.model";

const newStorage: JSONSchemaType<NewStorage> = {
	type: "object",
	properties: {
		ip: { type: "string", maxLength: 100, format: "ipv4" },
		description: { type: "string", nullable: true, maxLength: 250 },
		parent: { type: "number", nullable: true },
		pathstring: { type: "string", nullable: true, maxLength: 250 },
		owner: { type: "number", nullable: true },
		icon: { type: "string", nullable: true, maxLength: 100 },
		structural: { type: "boolean" },
		external: { type: "boolean" },
		tags: { type: "array", items: { type: "string" }, nullable: true },
		row: { type: "string", nullable: true },
		slot: { type: "string", nullable: true },
		width: { type: "string", nullable: true },
	},
	required: ["ip"],
	additionalProperties: false,
};
const newLocation: JSONSchemaType<NewLocation> = {
	type: "object",
	properties: {
		ip: { type: "string", maxLength: 100, format: "ipv4" },
		description: { type: "string", nullable: true, maxLength: 250 },
		parent: { type: "number", nullable: true },
		pathstring: { type: "string", nullable: true, maxLength: 250 },
		owner: { type: "number", nullable: true },
		icon: { type: "string", nullable: true, maxLength: 100 },
		structural: { type: "boolean" },
		external: { type: "boolean" },
		tags: { type: "array", items: { type: "string" }, nullable: true },
		row: { type: "string" },
		slot: { type: "string" },
		width: { type: "string" },
	},
	required: ["ip", "row", "slot", "width"],
	additionalProperties: false,
};

const ajv = new Ajv();
addFormats(ajv);
const validateLocation = ajv.compile(newLocation);
const validateStorage = ajv.compile(newStorage);

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
	if (validateLocation(req.body)) {
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
								findOrCreate(width, pk, false)
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
	} else if (validateStorage(req.body)) {
		const ip = req.body.ip;
		findOrCreate(ip, null, true)
			.then((pk: number) => {
				res.json({ pk: pk });
			})
			.catch((e: AxiosError) =>
				res.status(e.response?.status || 400).json(e.response),
			);
	} else {
		res.status(400).json(validateLocation.errors);
	}
};
