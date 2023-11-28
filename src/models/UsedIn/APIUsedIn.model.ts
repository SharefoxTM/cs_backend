import { APIPartDetail } from "../Part/APIPartDetail.model";

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
