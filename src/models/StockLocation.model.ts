export type StockLocation = {
	pk: number;
	name: string;
	description: string;
	pathstring: string;
	icon: string;
	structural: boolean;
	external: boolean;
	tags: string[];
};
