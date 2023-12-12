import { Router } from "express";
import Controller from "../controllers/company/company.controller";

export const CompanyRouter = Router();

// TODO: Check op id doen om te kijken of het een number is

CompanyRouter.route("/parts/")
	.get(Controller.getSupplierPartList)
	.post(Controller.createSupplierPart);
CompanyRouter.route("/suppliers/").get(Controller.getSupplierList);
