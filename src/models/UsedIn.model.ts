import { APIPartDetail } from "./Part.model";

export type UsedIn = {
	allow_variants: boolean;
	inherited: boolean;
	optional: boolean;
	consumable: boolean;
	part_detail: {
		pk: number;
		barcode_hash: string;
		full_name: string;
		thumbnail: string;
		active: boolean;
		assembly: boolean;
		is_template: boolean;
		purchaseable: boolean;
		salable: boolean;
		trackable: boolean;
		virtual: boolean;
		units: string;
	};
	quantity: number;
};

export type APIUsedIn = {
	allow_variants: boolean;
	inherited: boolean;
	note: string;
	optional: boolean;
	consumable: boolean;
	overage: string;
	pk: number;
	part: number;
	part_detail: APIPartDetail;
	pricing_min: string;
	pricing_max: string;
	quantity: number;
	reference: string;
	sub_part: number;
	sub_part_detail: APIPartDetail;
	substitutes: [
		{
			pk: number;
			bom_item: number;
			part: number;
			part_detail: APIPartDetail;
		},
	];
	validated: boolean;
	available_stock: number;
	available_substitute_stock: number;
	available_variant_stock: number;
	on_order: number;
};
