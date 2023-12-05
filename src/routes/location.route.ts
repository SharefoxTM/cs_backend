import { Router } from "express";
import LocationController from "../controllers/location/location.controller";

export const LocationRouter = Router();

LocationRouter.route("/").post(LocationController.createLocation);
