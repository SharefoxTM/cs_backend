import { Router } from "express";
import PartController from "../controllers/parts/parts.controller";

export const PartRouter = Router();

// TODO: Check op id doen om te kijken of het een number is

PartRouter.route("/").get(PartController.getAllParts);
//.post(PartController.createCategory);

PartRouter.route("/:id").get(PartController.getPart);
// 	.put(PartController.updateCategory)
// 	.delete(PartController.deleteCategory);
