import { APIPartDetail } from "../Part/APIPartDetail.model";

export type APIBuildOrders = {
	pk: number;
	build: number;
	build_line: number;
	install_into: number;
	stock_item: number;
	quantity: number;
	build_detail: {
		pk: number;
		url: string;
		title: string;
		barcode_hash: string;
		batch: string;
		creation_date: string;
		completed: number;
		completion_date: number;
		destination: number;
		parent: number;
		part: number;
		part_detail: APIPartDetail;
		project_code: number;
		project_code_detail: number;
		reference: string;
		sales_order: number;
		quantity: number;
		status: number;
		status_text: string;
		target_date: number;
		take_from: number;
		notes: string;
		link: string;
		issued_by: number;
		issued_by_detail: {
			pk: number;
			username: string;
			first_name: string;
			last_name: string;
			email: string;
		};
		responsible: number;
		responsible_detail: {
			pk: number;
			owner_id: number;
			name: string;
			label: string;
		};
		priority: number;
	};
}[];
