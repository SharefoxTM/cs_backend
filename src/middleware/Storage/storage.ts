import net from "net";
import { StorageResult } from "../../models/Storage/StorageResult.model";

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
		const client = new net.Socket();
		client.connect(5050, ip, function () {
			client.write(JSON.stringify({ type: "vegas", mode: mode }));
		});

		client.on("data", function (data) {
			const result = checkData(data, "mode");
			client.destroy();
			resolve(result);
		});
	});
};

export default {
	storeReel,
	retrieveReel,
	updateMode,
};
