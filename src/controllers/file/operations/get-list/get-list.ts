import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const getPaginatedThumbs: Handler = (req, res) => {
	const page = parseInt(req.query.page?.toString() || "0") + 1;
	const pageSize = parseInt(req.query.pageSize?.toString() || "25");
	const startIndex = (page - 1) * pageSize;
	const endIndex = page * pageSize;
	inventree
		.get(`api/part/thumbs/`, {
			params: req.query,
		})
		.then((response: AxiosResponse) => {
			const paginatedParts = response.data.slice(startIndex, endIndex);
			const totalPages = Math.ceil(response.data.length / pageSize);
			res.json({ data: paginatedParts, totalPages });
		})
		.catch((error: AxiosError) => {
			res.status(error.response?.status || 400).json(error.response?.data);
		});
};
