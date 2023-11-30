import { Router } from "express";
import StorageController from "../controllers/storage/storage.controller";

export const StorageRouter = Router();

StorageRouter.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

StorageRouter.route("/mode/").post(StorageController.updateMode);
