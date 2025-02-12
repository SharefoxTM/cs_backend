import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError } from "axios";

export const deleteCategory: Handler = (req, res) => {
	if (req.headers["authorization"] === undefined) {
		res.status(401).json({ message: "Authorization header not provided" });
		return;
	}
	if (req.headers["authorization"] !== process.env.DELETE_TOKEN) {
		res.status(401).json({ message: "Invalid API key" });
		return;
	}
	if (!req.params.id) {
		res.status(400).json({ message: "Category ID not provided" });
		return;
	}
	inventree
		.delete(`api/part/category/${req.params.id}/`)
		.then(() => {
			res.status(204);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 500).json({
				message:
					(err.response?.data as { detail: string })?.detail ||
					"Internal server error",
			}),
		);
};
