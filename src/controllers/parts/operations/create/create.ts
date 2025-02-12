import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { inventree, selfAccess } from "../../../../server";
import { APIPart } from "../../../../models/Part.model";
import { ajv } from "./../../../../middleware/Ajv/validator";

export const createPart: Handler = (req, res) => {
	const validate = ajv.getSchema("POST /parts")!;
	if (validate(req.body)) {
		inventree
			.post(`api/part/`, req.body)
			.then((response: AxiosResponse<APIPart>) => {
				res.json(response.data);
			})
			.catch((err: AxiosError) =>
				res.status(err.response?.status || 400).json(err.response),
			);
	} else {
		res.status(400).json(validate.errors);
	}
};

export const createParameter: Handler = (req, res) => {
	const validateParam = ajv.getSchema("POST / parameters")!;
	if (validateParam(req.body)) {
		selfAccess
			.get(`parts/parameter/template/${req.body.template}`)
			.then((resp: AxiosResponse) => {
				if (resp.data.choices !== "") {
					const choices = resp.data.choices.split(", ");
					if (!choices.includes(req.body.data))
						res
							.status(400)
							.json({ Message: "Data not acceptable for parameter template" });
				}
				inventree
					.get(
						`api/part/parameter/?part=${req.body.part}&template=${req.body.template}&limit=1`,
					)
					.then((resp: AxiosResponse) => {
						if (resp.data.count !== 0) {
							inventree
								.patch(`api/part/parameter/${resp.data.results[0].pk}/`, {
									data: req.body.data,
								})
								.then((response: AxiosResponse) => {
									res.json(response.data);
								})
								.catch((err: AxiosError) =>
									res
										.status(err.response?.status || 400)
										.json(err.response?.data),
								);
						} else {
							inventree
								.post(`api/part/parameter/`, req.body)
								.then((response: AxiosResponse) => {
									res.json(response.data);
								})
								.catch((err: AxiosError) =>
									res
										.status(err.response?.status || 400)
										.json(err.response?.data),
								);
						}
					});
			});
	} else {
		res.status(400).json(validateParam.errors);
	}
};
