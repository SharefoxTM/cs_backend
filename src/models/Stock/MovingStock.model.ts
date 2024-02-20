import { APIPartstatus } from "../Utils/Utils.model";

export type MovingStock = {
	batch: String;
	delete_on_deplete: boolean;
	location_detail_pathstring: string;
	pk: number;
	quantity: number;
	serial: string;
	status: APIPartstatus;
	status_text: string;
	supplier_part_SKU: string;
	barcode_hash: string;
};
