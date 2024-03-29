import { APIManufacturerDetail } from "./APIManufacturerDetail.model";
import { APIManufacturerPartDetail } from "./APIManufacturerPartDetail.model";
import { APIPartDetail } from "../Part/APIPartDetail.model";
import { APISupplierDetail } from "./APISupplierDetail.model";

export type APISupplierPart = {
	available: string;
	availability_updated: string;
	description: string;
	in_stock: number;
	link: string;
	manufacturer: string;
	manufacturer_detail: APIManufacturerDetail;
	manufacturer_part: number;
	manufacturer_part_detail: APIManufacturerPartDetail;
	MPN: string;
	note: string;
	pk: number;
	barcode_hash: string;
	packaging: string;
	pack_quantity: string;
	pack_quantity_native: string;
	part: number;
	part_detail: APIPartDetail;
	SKU: string;
	supplier: number;
	supplier_detail: APISupplierDetail;
	url: string;
	updated: string;
	tags: string[];
};
