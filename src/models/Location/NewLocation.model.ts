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
