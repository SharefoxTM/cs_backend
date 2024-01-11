import { Router } from "express";
import FileController from "../controllers/file/file.controller";

export const FileRouter = Router();
// TODO: Check op id doen om te kijken of het een number is

FileRouter.route("/:folder/:type/:id").get(FileController.getFile);
