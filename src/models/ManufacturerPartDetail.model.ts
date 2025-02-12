import { APIManufacturerDetail } from "./ManufacturerDetail.model";

export type APIManufacturerPartDetail = {
	pk: number;
	part: number;
	manufacturer: number;
	manufacturer_detail: APIManufacturerDetail;
	description: string;
	MPN: string;
	link: string;
	tags: string[];
};
