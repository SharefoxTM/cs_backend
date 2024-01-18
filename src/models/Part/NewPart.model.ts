export type NewPart = {
	active: boolean;
	assembly: boolean;
	category: number;
	component: boolean;
	default_expiry?: number;
	default_location?: number;
	default_supplier?: number;
	description?: string;
	image?: string;
	IPN?: string;
	is_template: boolean;
	keywords?: string;
	last_stocktake?: string;
	link?: string;
	minimum_stock?: number;
	name: string;
	notes?: string;
	purchaseable: boolean;
	remote_image?: string;
	revision?: string;
	salable: boolean;
	trackable: boolean;
	units?: string;
	variant_of?: number;
	virtual: boolean;
	responsible?: number;
	tags?: string[];
};
