export type APICategory = {
	name: string;
	description?: string;
	default_location?: number;
	default_keywords?: string;
	parent?: number;
	pathstring?: string;
	structural?: boolean;
	icon?: string;
};
