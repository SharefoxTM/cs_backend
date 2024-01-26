import { Router } from "express";
import FileController from "../controllers/file/file.controller";

export const FileRouter = Router();

FileRouter.route("/:folder/:type/:id").get(FileController.getFile);
