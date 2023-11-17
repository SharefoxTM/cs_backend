import { Handler, Response, response } from "express";
import { CategoryTree } from "../../../../models/CategoryTree.model";
import { APICategory } from "../../../../models/Category.model";
import Map from "../../../../helpers/mapItems";
import axios, { AxiosResponse } from "axios";

require("dotenv").config();

const buildTree = (nodes: APICategory, parent: number | null): APICategory => {
	return nodes
		.filter((node) => node.parent === parent)
		.map((node) => {
			const children = buildTree(nodes, node.pk);
			return { ...node, node, children };
		});
};

const url = process.env.DB_HOST + "/api/part/category/";
const getCategories = async (): Promise<APICategory> => {
	const data = await axios
		.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((response: AxiosResponse<APICategory>) => {
			return response.data;
		});
	return data;
};

export const getCategoryTree: Handler = async (req, res, next) => {
	try {
		const categories: APICategory = await getCategories();
		const tree: CategoryTree = Map.mapTree(buildTree(categories, null));
		res.json(tree);
	} catch {
		console.log(`Error: ${response.statusCode}`);
	}
};
