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
