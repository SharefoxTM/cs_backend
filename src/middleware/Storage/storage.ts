import net from "net";
import { StorageResult } from "../../models/Storage/StorageResult.model";

const checkData = (data: any) => {
	let result = undefined;
	if (data !== undefined) {
		const recv = JSON.parse(data.toString());

		if (recv.type === "error") {
			result = {
				status: 400,
				data: recv.error,
				message: "Failed to store!",
			};
		} else {
			if (recv.out_come === "geen plaats") {
				result = {
					status: 400,
					data: "No slots available!",
					message: "Failed to store!",
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
	} else {
		result = {
			status: 404,
			data: "Connection error!",
			message: "Failed to read!",
		};
	}
	return result;
};
type StoreReelProps = {
	ip: string;
	width: string;
};
const storeReel = async ({
	ip,
	width,
}: StoreReelProps): Promise<StorageResult> => {
	return new Promise<StorageResult>((resolve, reject) => {
		const socket = new net.Socket();
		socket.connect(5050, ip, function () {
			socket.write(JSON.stringify({ type: "store", ID: "3", width: width }));
		});

		socket.on("data", (data) => {
			const result = checkData(data);
			socket.destroy();
			resolve(result);
		});

		socket.on("error", (error) => {
			console.log(error);
			socket.destroy();
			reject();
		});
	});
};

export default {
	storeReel,
};
