import { Handler } from "express";
import storage from "../../../../middleware/Storage/storage";

export const updateMode: Handler = (req, res) => {
	//TODO: check response
	if (req.body.ip && req.body.mode) {
		storage
			.updateMode(req.body.ip, req.body.mode)
			.then(() => res.status(200).json("Success!"))
			.catch((error) => {
				console.log(error);
				res.status(400).json(error);
			});
	} else res.status(400).json("Data incorrect!");
};
