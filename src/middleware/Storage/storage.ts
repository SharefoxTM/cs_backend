import net from "net";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import axios, { AxiosResponse } from "axios";
import { APILocation } from "../../models/Location/APILocation.model";
import { rejects } from "assert";

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

const storeReel = async (ip: string, width: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ type: "store", ID: "3", width: width }));
		});

		socket.on("data", (data) => {
			const result = checkData(data, "store");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject();
		});
	});
};

const retrieveReel = async (location_path: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const [ip, row, slot, width] = location_path.split("/");
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(
				JSON.stringify({
					type: "retrieve",
					ID: "1",
					rij: row,
					slot: slot,
					width: width,
				}),
			);
		});

		socket.on("data", (data) => {
			const result = checkData(data, "retrieve");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject();
		});
	});
};

const updateMode = async (ip: string, mode: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ type: "vegas", mode: mode }));
		});

		socket.on("data", function (data) {
			const result = checkData(data, "mode");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject();
		});
	});
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
	return (await axios
		.all(requests)
		.then((responses: any) =>
			responses.map(
				(responseLocations: AxiosResponse<APILocation[]>) =>
					responseLocations.data,
			),
		)
		.then((response: any) => response)
		.then((data: APILocation[][]) =>
			data.map((locations: APILocation[]) =>
				locations.map((location) => location.pk),
			),
		)) as string[];
};

const getWidthPathstrings = async (SlotPKs: string[]): Promise<string[]> => {
	const requests = SlotPKs.map((pk) =>
		axios.get(`${process.env.DB_HOST}/api/stock/location/${pk}/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		}),
	);
	return axios
		.all(requests)
		.then((responses: AxiosResponse<APILocation[]>[]) =>
			responses.map((responseLocations) => responseLocations.data),
		)
		.then((response: any) => response.data)
		.then((data: APILocation[]) =>
			data.map(
				(location: APILocation) => location.pathstring.toString() as string,
			),
		);
};

const initialiseStorage = async (storagePk: string) => {
	// storageIP/storageshelve/storageSlot/storageWidth
	const shelvePKs: string[] = await getShelvePKs(storagePk);
	const slotPKArrays: string[] = await getSlotPKs(shelvePKs);
	const slotPKs = slotPKArrays.flat(1);
	console.log(slotPKs);

	const widthPSs: string[] = await getWidthPathstrings(slotPKs);
	console.log(widthPSs);
};

export default {
	storeReel,
	retrieveReel,
	updateMode,
	initialiseStorage,
};
