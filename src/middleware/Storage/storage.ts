import net from "net";
import { StorageResult } from "../../models/StorageResult.model";
import S from "../../controllers/storage/resources";
import { AxiosError } from "axios";

const initReels = (reels: string[]) => {
	let data = new Array<Object>();
	let [ip, shelve, slot, width] = reels[0].split("/");
	let index = 0;

	reels.map((path) => {
		if (path !== undefined) {
			[ip, shelve, slot, width] = path.split("/");

			data[index++] = {
				width: parseInt(width),
				row: parseInt(shelve),
				slot: parseInt(slot),
			};
		}
	});

	return new Promise<StorageResult>((resolve, reject) => {
		if (data.length === 0) {
			resolve({ status: 200, data: "No reels found" });
			return;
		}
		const socket = new net.Socket();
		try {
			socket.connect(5050, ip, function () {
				socket.write(JSON.stringify({ mode: "put", data: data }));
			});
		} catch (error) {
			socket.destroy();
			reject(error);
		}

		socket.on("data", (data) => {
			const result = S.checkData(data);
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject(error);
		});
	});
};

const storeReel = (ip: string, width: number): Promise<any> => {
	return new Promise<any>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ mode: "put", data: { width: width } }));
		});

		socket.on("data", (data) => {
			let result = { data: {}, status: 0 };
			if (data !== undefined) {
				const parsedResult = JSON.parse(data.toString());
				result = {
					data: {
						message: parsedResult.data.message,
						row: parsedResult.data.row,
						slot: parsedResult.data.slot,
					},
					status: parsedResult.status,
				};
			} else {
				result = {
					status: 500,
					data: "Connection error!",
				};
			}
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
					mode: "take",
					data: {
						row: parseInt(row),
						slot: parseInt(slot),
						width: parseInt(width),
					},
				}),
			);
		});

		socket.on("data", (data) => {
			const result = S.checkData(data);
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
			const result = S.checkData(data);
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			socket.destroy();
			reject({ status: 500, data: "Time-out" });
		});
	});
};

const getStatus = (ip: string, row: string): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ mode: "status", data: { row: row } }));
		});

		socket.on("data", (data) => {
			const result = S.checkData(data);
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
				if (shelvePKs.length === 0) {
					resolve({ status: 200, data: "No shelves found" });
					return;
				}

				S.getSlotPKs(shelvePKs)
					.then((slotPKs: string[]) => {
						if (slotPKs.length === 0) {
							resolve({ status: 200, data: "No slots found" });
							return;
						}

						S.getWidthPathstrings(slotPKs.flat(1))
							.then((paths: string[]) => {
								if (paths.length === 0) {
									resolve({ status: 200, data: "No paths found" });
									return;
								}

								paths = paths.flat(1);

								initReels(paths)
									.then((result: StorageResult) => {
										resolve({ status: 200, data: "init success" });
									})
									.catch((e: AxiosError) => {
										reject({ status: 500, data: "Time-out: storage" });
									});
							})
							.catch(() => {
								reject({ status: 500, data: "Time-out: InvenTree" });
							});
					})
					.catch(() => {
						reject({ status: 500, data: "Time-out: InvenTree" });
					});
			})
			.catch(() => {
				reject({ status: 500, data: "Time-out: InvenTree" });
			});
	});
};

export default {
	storeReel,
	retrieveReel,
	updateMode,
	getStatus,
	initialiseStorage,
};
