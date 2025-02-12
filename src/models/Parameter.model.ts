export type NewParameter = {
	part: number;
	template: number;
	data: string;
};

export type TemplateDetails = {
	pk: number;
	name: string;
	units: string;
	description: string;
	checkbox: boolean;
	choices: string;
};

export type APIPartParameter = {
	pk: number;
	template: number;
	template_detail: TemplateDetails;
	data: string;
	data_numeric: number | null;
};
