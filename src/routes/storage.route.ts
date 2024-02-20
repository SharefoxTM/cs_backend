import { Router } from "express";
import StorageController from "../controllers/storage/storage.controller";

export const StorageRouter = Router();

StorageRouter.route("/").post(StorageController.createReel);
StorageRouter.route("/init/").post(StorageController.initStorage);
StorageRouter.route("/mode/").post(StorageController.updateMode);
StorageRouter.route("/status/").post(StorageController.getStatus);

StorageRouter.route("/moving/:ID").get(StorageController.getReelList);
StorageRouter.route("/:ID_Location").get(StorageController.getReel);
