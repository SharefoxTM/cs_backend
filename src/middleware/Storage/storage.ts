import net from "net";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import S from "../../controllers/storage/resources";
import { AxiosError } from "axios";

const storeReel = (ip: string, width: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ mode: "put", data: { width: width } }));
		});

		socket.on("data", (data) => {
			const result = S.checkData(data, "store");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
		});
	});
};

const retrieveReel = (location_path: string): Promise<StorageResult> => {
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
			const result = S.checkData(data, "retrieve");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
		});
	});
};

const updateMode = (ip: string, mode: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ mode: "led", data: mode }));
		});

		socket.on("data", function (data) {
			const result = S.checkData(data, "mode");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
		});
	});
};

const getStatus = (ip: string, row: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		console.log({ ip, row });
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ mode: "status", data: { row: `${row}` } }));
		});

		socket.on("data", (data) => {
			const result = S.checkData(data, "status");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
		});
	});
};

const initialiseStorage = (storagePk: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		S.getShelvePKs(storagePk)
			.then((shelvePKs: string[]) => {
				S.getSlotPKs(shelvePKs)
					.then((slotPKs: string[]) => {
						S.getWidthPathstrings(slotPKs.flat(1))
							.then((paths: string[]) => {
								paths.flat(1).map((path: string) => {
									const [ip, shelve, slot, width] = path.split("/");
									storeReel(ip, width);
								});
								resolve({ status: 200, data: "init success" });
							})
							.catch((e: AxiosError) => reject(e));
					})
					.catch((e: AxiosError) => reject(e));
			})
			.catch((e: AxiosError) => reject(e));
	});
};

export default {
	storeReel,
	retrieveReel,
	updateMode,
	getStatus,
	initialiseStorage,
};
