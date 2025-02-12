import { AxiosError, AxiosResponse } from "axios";
import { inventree, selfAccess } from "../../../../server";
import { APICategory } from "../../../../models/Category.model";

const multer = require("multer");
const XLSX = require("xlsx");
type Parameter = {
	name: string;
	value: string;
};

type PassivesTemplateRow = {
	name: string;
	category: string;
	min_stock?: string;
	description?: string;
	parameters?: Parameter[];
};

const createPartsFromTemplate = (parts: PassivesTemplateRow[]) => {
	parts.map((part: PassivesTemplateRow) => {
		inventree
			.get(`api/part/category/`, {
				params: { name: part.category },
			})
			.then((resp: AxiosResponse<APICategory>) => {
				let body = {
					active: true,
					category: resp.data[0].pk,
					component: true,
					description: part.description,
					minimum_stock: part.min_stock,
					name: part.name,
					purchaseable: true,
					assembly: false,
					is_template: false,
					salable: false,
					trackable: false,
					virtual: false,
				};
				selfAccess
					.post("parts/", body)
					.then((resp: AxiosResponse) => {
						part.parameters?.map((param: Parameter) => {
							if (param.value !== undefined) {
								inventree
									.get(`api/part/parameter/template/?search=${param.name}`)
									.then((respTemplate: AxiosResponse) => {
										let tBody = {
											part: resp.data.pk,
											template: respTemplate.data[0].pk,
											data: param.value,
										};

										inventree
											.post(`api/part/parameter/`, tBody)
											.catch(console.log);
									});
							}
						});
					})
					.catch(console.log);
			});
	});
};

const parseRawData = (dataArr: Array<any>) => {
	dataArr.shift();
	let header = dataArr[0];
	dataArr.shift();
	let rows: PassivesTemplateRow[] = dataArr.map((data: Array<any>) => {
		let params: Parameter[] = new Array(data.length - 4);
		for (let i = 4; i < data.length; i++) {
			params[i - 4] = {
				name: header[i],
				value: data[i],
			};
		}
		return {
			name: data[0],
			category: data[1],
			min_stock: data[2],
			description: data[3],
			parameters: params,
		};
	});
	createPartsFromTemplate(rows);
};

export const importParts = (req: any, res: any) => {
	const storage = multer.memoryStorage();
	const upload = multer({ storage: storage }).single("file");

	upload(req, res, (err: any) => {
		if (err) {
			res.status(500);
		} else {
			const file = req.file.buffer;
			const raw_data = XLSX.utils.sheet_to_json(
				XLSX.read(file).Sheets[XLSX.read(file).SheetNames[0]],
				{ header: 1 },
			);
			parseRawData(raw_data);
			res.status(201).json({ message: "Success" });
		}
	});
};
