import { Router } from "express";
import CategoryController from "../controllers/category/categories.controller";

export const CategoryRouter = Router();
// TODO: Check op id doen om te kijken of het een number is

CategoryRouter.route("/")
	.get(CategoryController.getAllCategories)
	.post(CategoryController.createCategory);

CategoryRouter.route("/tree/").get(CategoryController.getCategoryTree);

CategoryRouter.route("/:id").get(CategoryController.getCategory);
// .put(CategoryController.updateCategory)
// .delete(CategoryController.deleteCategory);
