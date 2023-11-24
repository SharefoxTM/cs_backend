export type APIStockLocation = {
	pk: number;
	barcode_hash: string;
	url: string;
	name: string;
	level: number;
	description: string;
	parent: number | null;
	pathstring: string;
	items: number;
	owner: number | null;
	icon: string;
	structural: boolean;
	external: boolean;
	tags: string[];
};
