import net from "net";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import storageHelper from "../../helpers/storage.helper";

const storeReel = async (ip: string, width: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ type: "store", ID: "3", width: width }));
		});

		socket.on("data", (data) => {
			const result = storageHelper.checkData(data, "store");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
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
			const result = storageHelper.checkData(data, "retrieve");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
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
			const result = storageHelper.checkData(data, "mode");
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
		});
	});
};

const initialiseStorage = async (storagePk: string) => {
	const shelvePKs: string[] = await storageHelper.getShelvePKs(storagePk);
	const slotPKs: string[] = (await storageHelper.getSlotPKs(shelvePKs)).flat(1);
	const paths: string[] = (
		await storageHelper.getWidthPathstrings(slotPKs)
	).flat(1);
	paths.map((path: string) => {
		const [ip, shelve, slot, width] = path.split("/");
		storeReel(ip, width);
	});
};

export default {
	storeReel,
	retrieveReel,
	updateMode,
	initialiseStorage,
};
