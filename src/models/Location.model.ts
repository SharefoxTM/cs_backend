export type APILocation = {
	pk: number;
	barcode_hash: string;
	url: string;
	name: string;
	level: number;
	description: string;
	parent: number;
	pathstring: string;
	items: number;
	owner: number;
	icon: string;
	structural: boolean;
	external: boolean;
	tags: string[];
};

export type APIAddress = {
	pk: number;
	company: number;
	title: string;
	primary: true;
	line1: string;
	line2: string;
	postal_code: string;
	postal_city: string;
	province: string;
	country: string;
	shipping_notes: string;
	internal_shipping_notes: string;
	link: string;
	confirm_primary: false;
};

export type APILocationDetail = {
	pk: number;
	name: string;
	pathstring: string;
};

export type NewLocation = {
	ip: string;
	description?: string;
	parent?: number;
	pathstring?: string;
	owner?: number;
	icon?: string;
	structural: boolean;
	external: boolean;
	tags?: string[];
	row: string;
	slot: string;
	width: string;
};

export type NewStorage = {
	ip: string;
	description?: string;
	parent?: number;
	pathstring?: string;
	owner?: number;
	icon?: string;
	structural: boolean;
	external: boolean;
	tags?: string[];
	row?: string;
	slot?: string;
	width?: string;
};
