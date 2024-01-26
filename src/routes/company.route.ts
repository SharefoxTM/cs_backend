import { Router } from "express";
import Controller from "../controllers/company/company.controller";

export const CompanyRouter = Router();

CompanyRouter.route("/parts/")
	.get(Controller.getSupplierPartList)
	.post(Controller.createSupplierPart);
CompanyRouter.route("/suppliers/").get(Controller.getSupplierList);
