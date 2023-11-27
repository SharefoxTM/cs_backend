export type APIPartDetail = {
	pk: number;
	IPN: string;
	barcode_hash: string;
	default_location: number;
	name: string;
	revision: string;
	full_name: string;
	description: string;
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
