import { Handler } from "express";
import { APICategory } from "../../../../models/Category/Category.model";
import Map from "../../../../helpers/mapItems.helper";
import { AxiosError, AxiosResponse } from "axios";
import { selfAccess } from "../../../../server";

const buildTree = (nodes: APICategory, parent: number | null): APICategory => {
	return nodes
		.filter((node) => node.parent === parent)
		.map((node) => {
			const children = buildTree(nodes, node.pk);
			return { ...node, node, children };
		});
};

export const getCategoryTree: Handler = (req, res) => {
	selfAccess
		.get(`categories/`)
		.then((response: AxiosResponse<APICategory>) => {
			res.json(Map.mapTree(buildTree(response.data, null)));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
