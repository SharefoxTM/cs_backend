import axios, { AxiosResponse } from "axios";
import { StorageResult } from "../../models/Storage/StorageResult.model";
import { APILocationDetail } from "../../models/Location/APILocationDetail.model";

type FindOrCreateLocationProps = {
	ip: string;
	row: string;
	slot: string;
	width: string;
};
export const findOrCreateLocation = (
	locationBody: FindOrCreateLocationProps,
	response: StorageResult,
): Promise<number | void> => {
	return new Promise<number | void>((resolve, reject) =>
		axios
			.post(`${process.env.BE_SELF}location/`, locationBody)
			.then((resp: AxiosResponse<APILocationDetail>) => resolve(resp.data.pk))
			.catch((e: Error) => {
				console.log(e.message);
				response.status = 400;
				response.data = e.message;
				reject();
			}),
	);
};
