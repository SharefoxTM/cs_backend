import { Router } from "express";
import Controller from "../controllers/company/company.controller";

export const CompanyRouter = Router();

CompanyRouter.route("/parts/")
	.get(Controller.getSupplierPartList)
	.post(Controller.createSupplierPart);
CompanyRouter.route("/part/:partID/:location").put(Controller.setMoving);

CompanyRouter.route("/suppliers/").get(Controller.getSupplierList);
