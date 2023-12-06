import { Router } from "express";
import LocationController from "../controllers/location/location.controller";

export const LocationRouter = Router();

LocationRouter.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

LocationRouter.route("/").post(LocationController.createLocation);
LocationRouter.route("/IPs/").get(LocationController.getStorageIPs);
