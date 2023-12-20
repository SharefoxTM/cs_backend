import axios, { AxiosResponse } from "axios";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import { APILocationDetail } from "../../models/Location/APILocationDetail.model";
import { APILocation } from "../../models/Location/APILocation.model";

type FindOrCreateLocationProps = {
	ip: string;
	row: string;
	slot: string;
	width: string;
};

const findOrCreateLocation = (
	locationBody: FindOrCreateLocationProps,
	response: StorageResult,
): Promise<number | void> => {
	return new Promise<number | void>((resolve, reject) =>
		axios
			.post(`${process.env.BE_SELF}location/`, locationBody)
			.then((resp: AxiosResponse<APILocationDetail>) => resolve(resp.data.pk))
			.catch((e: Error) => {
				response.status = 400;
				response.data = e.message;
				reject(e);
			}),
	);
};

const checkData = (data: any, type: "store" | "retrieve" | "mode") => {
	let result: StorageResult = { data: "", status: 0 };
	if (data !== undefined) {
		if (type === "store") {
			const recv = JSON.parse(data.toString());
			if (recv.type === "error") {
				result = {
					status: 400,
					data: recv.error,
				};
			} else {
				if (recv.out_come === "geen plaats") {
					result = {
						status: 400,
						data: "No slots available!",
					};
				} else {
					result = {
						status: 200,
						data: JSON.stringify({
							row: recv.slots[0].rij,
							slot: recv.slots[0].slot,
						}),
					};
				}
			}
		} else if (type === "retrieve") {
			if (data.out_come === "uitgenomen")
				result = {
					status: 200,
					data: "Success",
				};
			else
				result = {
					status: 400,
					data: "Error: already taken out!",
				};
		} else {
			result = {
				status: 200,
				data: "Success",
			};
		}
	} else {
		result = {
			status: 404,
			data: "Connection error!",
		};
	}
	return result;
};

const getShelvePKs = async (storagePK: string): Promise<string[]> => {
	return axios
		.get(`${process.env.DB_HOST}/api/stock/location/?parent=${storagePK}`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APILocation[]>) => response.data)
		.then((locations: APILocation[]) =>
			locations.map((location) => location.pk.toString() as string),
		);
};

const getSlotPKs = async (storagePK: string[]): Promise<string[]> => {
	const requests = storagePK.map((pk) =>
		axios.get(`${process.env.DB_HOST}/api/stock/location/?parent=${pk}`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		}),
	);
	return (
		(await axios
			.all(requests)
			.then((responses: any) =>
				responses.map(
					(responseLocations: AxiosResponse<APILocation[]>) =>
						responseLocations.data,
				),
			)
			// .then((response: any) => response)
			.then((data: APILocation[][]) =>
				data.map((locations: APILocation[]) =>
					locations.map((location) => location.pk),
				),
			)) as string[]
	);
};

const getWidthPathstrings = async (SlotPKs: string[]): Promise<string[]> => {
	const requests = SlotPKs.map((pk) =>
		axios.get(`${process.env.DB_HOST}/api/stock/location/?parent=${pk}`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		}),
	);
	return (
		(await axios
			.all(requests)
			.then((responses: any) =>
				responses.map(
					(responseLocations: AxiosResponse<APILocation[]>) =>
						responseLocations.data,
				),
			)
			// .then((response: any) => response)
			.then((data: APILocation[][]) =>
				data.map((locations: APILocation[]) =>
					locations.map((location) => location.pathstring),
				),
			)) as string[]
	);
};

export default {
	findOrCreateLocation,
	checkData,
	getShelvePKs,
	getSlotPKs,
	getWidthPathstrings,
};
