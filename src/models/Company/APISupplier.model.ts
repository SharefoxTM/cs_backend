import { APIAddress } from "../Location/APIAddress.model";

export type APISupplier = {
	pk: number;
	url: string;
	name: string;
	description: string;
	website: string;
	phone: string;
	address: string;
	email: string;
	currency: "AUD" | "CAD" | "CNY" | "EUR" | "GBP" | "JPY" | "NZD" | "USD";
	contact: string;
	link: string;
	image: string;
	is_customer: true;
	is_manufacturer: true;
	is_supplier: true;
	notes: string;
	parts_supplied: number;
	parts_manufactured: number;
	address_count: number;
	primary_address: APIAddress;
};
