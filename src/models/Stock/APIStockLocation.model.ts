import { APILocationDetail } from "../Location/APILocationDetail.model";
import { APISupplierPartDetail } from "../Company/APISupplierPartDetail.model";

export type APIStockLocation = {
	batch: String;
	belongs_to: number;
	build: number;
	consumed_by: number;
	customer: number;
	delete_on_deplete: boolean;
	expiry_date: string;
	is_building: false;
	link: string;
	location: number;
	location_detail: APILocationDetail;
	notes: string;
	owner: number;
	packaging: string;
	part: number;
	purchase_order: number;
	pk: number;
	quantity: number;
	sales_order: number;
	serial: string;
	status: 10 | 50 | 55 | 60 | 65 | 70 | 75 | 85;
	status_text: string;
	stocktake_date: string;
	supplier_part: number;
	supplier_part_detail: APISupplierPartDetail;
	barcode_hash: string;
	updated: string;
	purchase_price: string;
	purchase_price_currency:
		| "AUD"
		| "CAD"
		| "CNY"
		| "EUR"
		| "GBP"
		| "JPY"
		| "NZD"
		| "USD";
	allocated: number;
	expired: boolean;
	installed_items: number;
	stale: boolean;
	tracking_items: number;
	tags: string[];
};
