import axios, { AxiosError, AxiosResponse } from "axios";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import { APILocationDetail } from "../../models/Location/APILocationDetail.model";
import { APILocation } from "../../models/Location/APILocation.model";
import { inventree, selfAccess } from "../../server";
import { print } from "unix-print";
import Fs from "fs";
import Path from "path";

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
				locations.map((location) => {
					if (location.items !== 0) return location.pathstring;
				}),
			),
		)) as string[];
};

const createLabel = (pk: number) => {
	const path = Path.resolve(
		__dirname,
		"../../tmp/images",
		`${Math.random().toString(36).substr(7)}.pdf`,
	);
	const writer = Fs.createWriteStream(path);

	inventree
		.get(`api/label/stock/2/print/?item=${pk}&plugin=inventreelabel`, {})
		.then((resp) => {
			selfAccess
				.get(`file${resp.data.file}`, { responseType: "stream" })
				.then((resp) => resp.data.pipe(writer))
				.catch(console.log);
		})
		.catch(console.log);

	writer.on("finish", () => {
		print(path)
			.then(() => Fs.unlinkSync(path))
			.catch(console.log);
	});
};

export default {
	findOrCreateLocation,
	checkData,
	getShelvePKs,
	getSlotPKs,
	getWidthPathstrings,
	createLabel,
};
