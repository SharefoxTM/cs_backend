import { Router } from "express";
import PartController from "../controllers/parts/parts.controller";

export const PartRouter = Router();

PartRouter.route("/")
	.get(PartController.getAllParts)
	.post(PartController.createPart);

PartRouter.route("/paginated/").get(PartController.getPaginatedParts);

PartRouter.route("/:id")
	.get(PartController.getPart)
	.put(PartController.updatePart)
	.delete(PartController.deletePart);

PartRouter.route("/:id/:detailTopic").get(PartController.getDetails);
