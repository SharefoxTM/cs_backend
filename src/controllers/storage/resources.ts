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

const checkData = (data: any) => {
	let result: StorageResult = { data: "", status: 0 };
	if (data !== undefined) {
		const parsedResult = JSON.parse(data.toString());
		result = {
			data: parsedResult.data,
			status: parsedResult.status,
		};
	} else {
		result = {
			status: 500,
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
