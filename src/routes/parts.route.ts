import { Router } from "express";
import PartController from "../controllers/parts/parts.controller";

export const PartRouter = Router();

PartRouter.route("/")
	.get(PartController.getAllParts)
	.post(PartController.createPart);

PartRouter.route("/parameter").post(PartController.createParameter);
PartRouter.route("/parameter/template").get(
	PartController.getParameterTemplates,
);
PartRouter.route("/parameter/template/:id").get(
	PartController.getParameterTemplate,
);

PartRouter.route("/:id")
	.get(PartController.getPart)
	.put(PartController.updatePart)
	.delete(PartController.deletePart);

PartRouter.route("/:id/:detailTopic").get(PartController.getDetails);
PartRouter.route("/:id/image").put(PartController.updateThumbnail);
