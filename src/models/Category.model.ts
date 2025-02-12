export type APICategory = {
	pk: number;
	name: string;
	description: string;
	default_location?: number;
	default_keywords: string;
	level: number;
	parent?: number;
	part_count: number;
	pathstring: string;
	starred: boolean;
	url: string;
	structural: boolean;
	icon: string;
	children?: APICategory;
}[];

export type CategoryTree = {
	pk: number;
	name: string;
	part_count: number;
	children?: CategoryTree;
}[];

export type NewCategory = {
	name: string;
	description?: string;
	default_location?: number;
	default_keywords?: string;
	parent?: number;
	pathstring?: string;
	structural?: boolean;
	icon?: string;
};
