import { Router } from "express";
import StockController from "../controllers/stock/stock.controller";

export const StockRouter = Router();

StockRouter.route("/:id").get(StockController.getStockitem);
