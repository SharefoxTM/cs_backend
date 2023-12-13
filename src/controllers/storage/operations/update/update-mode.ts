import { Handler } from "express";
import net from "net";
import storage from "../../../../middleware/Storage/storage";

export const updateMode: Handler = (req, res) => {
	//TODO: check response
	storage.updateMode(req.body.ip, req.body.mode);
	res.status(200).json({ message: "success!" });
};
