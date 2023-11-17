import { Handler } from "express";

const axios = require("axios");
const url = process.env.DB_HOST + "/api/part/category/";

export const deleteCategory: Handler = async (req, res) => {
	const response = await axios(url);
	console.log(response.data);
};
