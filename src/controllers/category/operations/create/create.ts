import { Handler, response } from "express";

const axios = require("axios");
require("dotenv").config();

const url = process.env.DB_HOST + "/api/part/category/";

export const createCategory: Handler = async (req, res) => {
	try {
		const response = await axios(url);
		console.log(response.data);
	} catch {
		console.log(`Error: ${response.status}`);
	}
};
