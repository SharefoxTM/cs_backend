import { Handler } from "express";
import { CategoryTree } from "../../../../models/Category/CategoryTree.model";
import { APICategory } from "../../../../models/Category/Category.model";
import Map from "../../../../helpers/mapItems";
import axios, { AxiosResponse } from "axios";

require("dotenv");

const buildTree = (nodes: APICategory, parent: number | null): APICategory => {
	return nodes
		.filter((node) => node.parent === parent)
		.map((node) => {
			const children = buildTree(nodes, node.pk);
			return { ...node, node, children };
		});
};

export const getCategoryTree: Handler = async (req, res, next) => {
	const categories: APICategory = await axios
		.get(`${process.env.BE_SELF}categories/`, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
		})
		.then((data: AxiosResponse) => {
			return data.data as APICategory;
		});
	const tree: CategoryTree = Map.mapTree(buildTree(categories, null));
	res.json(tree);
};
