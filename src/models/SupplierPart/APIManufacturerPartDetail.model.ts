import { APIManufacturerDetail } from "./APIManufacturerDetail.model";

export type APIManufacturerPartDetail = {
	pk: 0;
	part: 0;
	manufacturer: 0;
	manufacturer_detail: APIManufacturerDetail;
	description: string;
	MPN: string;
	link: string;
	tags: string[];
};
