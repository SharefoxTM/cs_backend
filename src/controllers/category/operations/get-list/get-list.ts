import { AxiosError, AxiosResponse } from "axios";
import { Handler } from "express";
import { APICategory } from "../../../../models/Category.model";
import { inventree, selfAccess } from "../../../../server";
import Map from "../../../../helpers/mapItems.helper";
import resource from "../../resources";

export const getAllCategories: Handler = (req, res) => {
	inventree
		.get(`api/part/category/`)
		.then((response: AxiosResponse<APICategory>) => {
			res.json(response.data);
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};

export const getCategoryTree: Handler = (req, res) => {
	selfAccess
		.get(`categories/`)
		.then((response: AxiosResponse<APICategory>) => {
			res.json(Map.mapTree(resource.buildTree(response.data, null)));
		})
		.catch((err: AxiosError) =>
			res.status(err.response?.status || 400).json(err.response?.data),
		);
};
