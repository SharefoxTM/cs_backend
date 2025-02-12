import { APIAddress } from "./Location.model";
import { APICurrency } from "./Utils.model";

export type APISupplier = {
	pk: number;
	url: string;
	name: string;
	description: string;
	website: string;
	phone: string;
	address: string;
	email: string;
	currency: APICurrency;
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

export type APISupplierDetail = {
	pk: number;
	url: string;
	name: string;
	description: string;
	image: string;
};
