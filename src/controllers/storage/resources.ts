import axios, { AxiosError, AxiosResponse } from "axios";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import { APILocationDetail } from "../../models/Location/APILocationDetail.model";
import { APILocation } from "../../models/Location/APILocation.model";
import { inventree, selfAccess } from "../../server";

type FindOrCreateLocationProps = {
	ip: string;
	row: string;
	slot: string;
	width: string;
};

const findOrCreateLocation = (
	locationBody: FindOrCreateLocationProps,
): Promise<number> => {
	return new Promise<number>((resolve, reject) =>
		selfAccess
			.post(`location/`, locationBody)
			.then((resp: AxiosResponse<APILocationDetail>) => resolve(resp.data.pk))
			.catch((e: AxiosError) => reject(e)),
	);
};

const checkData = (
	data: any,
	type: "store" | "retrieve" | "mode" | "status",
) => {
	let result: StorageResult = { data: "", status: 0 };
	if (data !== undefined) {
		const parsedResult = JSON.parse(data.toString());
		if (type === "store") {
			if (parsedResult.status != 200) {
				result = {
					status: parsedResult.status,
					data: parsedResult.data,
				};
			} else {
				if (parsedResult.out_come === "geen plaats") {
					result = {
						status: 400,
						data: "No slots available!",
					};
				} else {
					result = {
						status: 200,
						data: JSON.stringify({
							row: parsedResult.slots[0].rij,
							slot: parsedResult.slots[0].slot,
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
		} else if (type === "mode") {
			result = {
				status: parsedResult.status,
				data: parsedResult.data,
			};
		} else if (type === "status") {
			result = {
				status: parsedResult.status,
				data: parsedResult.data,
			};
		} else {
			if (parsedResult.status != 200) {
				result = {
					status: parsedResult.status,
					data: parsedResult.data,
				};
			}
		}
	} else {
		result = {
			status: 404,
			data: "Connection error!",
		};
	}
	return result;
};

const getShelvePKs = (storagePK: string): Promise<string[]> => {
	return new Promise<string[]>((resolve, reject) => {
		inventree
			.get(`api/stock/location/?parent=${storagePK}`)
			.then((response: AxiosResponse<APILocation[]>) =>
				resolve(response.data.map((location) => location.pk.toString())),
			)
			.catch((e: AxiosError) => reject(e));
	});
};

const getSlotPKs = async (storagePK: string[]): Promise<string[]> => {
	const requests = storagePK.map((pk) =>
		inventree.get(`api/stock/location/?parent=${pk}`),
	);
	return (await axios
		.all(requests)
		.then((responses: AxiosResponse<APILocation[]>[]) =>
			responses.map(
				(responseLocations: AxiosResponse<APILocation[]>) =>
					responseLocations.data,
			),
		)
		.then((data: APILocation[][]) =>
			data.map((locations: APILocation[]) =>
				locations.map((location) => location.pk),
			),
		)) as string[];
};

const getWidthPathstrings = async (SlotPKs: string[]): Promise<string[]> => {
	const requests = SlotPKs.map((pk) =>
		inventree.get(`api/stock/location/?parent=${pk}`),
	);
	return (await axios
		.all(requests)
		.then((responses: AxiosResponse<APILocation[]>[]) =>
			responses.map(
				(responseLocations: AxiosResponse<APILocation[]>) =>
					responseLocations.data,
			),
		)
		.then((data: APILocation[][]) =>
			data.map((locations: APILocation[]) =>
				locations.map((location) => location.pathstring),
			),
		)) as string[];
};

export default {
	findOrCreateLocation,
	checkData,
	getShelvePKs,
	getSlotPKs,
	getWidthPathstrings,
};
