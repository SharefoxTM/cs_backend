import { Router } from "express";
import FileController from "../controllers/file/file.controller";

export const FileRouter = Router();

FileRouter.route("/parts/").post(FileController.importParts);

FileRouter.route("/:folder/:type/:id").get(FileController.getFile);

FileRouter.route("/media/label/output/:id").get(FileController.getLabel);
