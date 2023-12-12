import axios from "axios";
import { Handler } from "express";

export const getImage: Handler = async (req, res, next) => {
	if (!req.params.id) {
		return res.status(400).json({ error: "No ID found!" });
	}

	res.type("img/jpeg");
	try {
		const url =
			process.env.DB_HOST +
			`/${req.params.folder}/${req.params.type}/${req.params.id}`;
		const response = await axios.get(url, {
			headers: {
				Authorization: process.env.DB_TOKEN,
			},
			responseType: "stream",
		});

		response.data.pipe(res);
	} catch (error) {
		console.error("Error fetching image:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
