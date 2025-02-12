import { APIPartDetail } from "./Part.model";
import { APIManufacturerDetail } from "./ManufacturerDetail.model";
import { APIManufacturerPartDetail } from "./ManufacturerPartDetail.model";
import { APISupplierDetail } from "./Supplier.model";

export type SupplierPart = {
	available: string;
	description: string;
	in_stock: number;
	link: string;
	manufacturer: string;
	MPN: string;
	note: string;
	pk: number;
	barcode_hash: string;
	packaging: string;
	pack_quantity: string;
	pack_quantity_native: string;
	part: number;
	SKU: string;
	supplier: number;
	url: string;
	updated: string;
	tags: string[];
};

export type NewSupplierPart = {
	available?: string;
	description?: string;
	link?: string;
	manufacturer_part?: number;
	note?: string;
	packaging?: string;
	pack_quantity?: string;
	pack_quantity_native?: string;
	part: number;
	SKU: string;
	supplier: number;
	tags?: string[];
};

export type APISupplierPartDetail = {
	available: string;
	availability_updated: string;
	description: number;
	link: string | null;
	manufacturer_part: number;
	note: number;
	pk: number;
	barcode_hash: string;
	packaging: number;
	pack_quantity: string;
	pack_quantity_native: string;
	part: number;
	SKU: string;
	supplier: number;
	url: string;
	updated: number;
	tags: string[];
};

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
