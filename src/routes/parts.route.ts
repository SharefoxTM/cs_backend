import { Router } from "express";
import PartController from "../controllers/parts/parts.controller";

export const PartRouter = Router();
// TODO: Check op id doen om te kijken of het een number is

PartRouter.route("/")
	.get(PartController.getAllParts)
	.post(PartController.createPart);

PartRouter.route("/paginated/").get(PartController.getPaginatedParts);

PartRouter.route("/:id")
	.get(PartController.getPart)
	.put(PartController.updatePart);
// 	.delete(PartController.deleteCategory);

PartRouter.route("/:id/:detailTopic").get(PartController.getDetails);
