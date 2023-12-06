import { Router } from "express";
import Controller from "../controllers/company/company.controller";

export const CompanyRouter = Router();

CompanyRouter.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

// TODO: Check op id doen om te kijken of het een number is

CompanyRouter.route("/").get(Controller.getSupplierPartList);
