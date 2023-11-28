export type APIPartStock = {
	batch: string;
	belongs_to: number;
	build: number;
	consumed_by: number;
	customer: number;
	delete_on_deplete: boolean;
	expiry_date: string;
	is_building: boolean;
	link: string;
	location: number;
	notes: string;
	owner: number;
	packaging: string;
	part: number;
	purchase_order: number;
	purchase_order_reference: string;
	pk: number;
	quantity: number;
	sales_order: number;
	sales_order_reference: string;
	serial: string;
	status: 10 | 50 | 55 | 60 | 65 | 70 | 75 | 85;
	status_text: string;
	stocktake_date: string;
	supplier_part: number;
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
