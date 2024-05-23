export type APICategory = {
	pk: number;
	name: string;
	description: string;
	default_location: number | null;
	default_keywords: string;
	level: number;
	parent: number | null;
	part_count: number;
	pathstring: string;
	starred: boolean;
	url: string;
	structural: boolean;
	icon: string;
	children?: APICategory;
}[];
