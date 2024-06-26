import { Router } from "express";
import CategoryController from "../controllers/category/categories.controller";

export const CategoryRouter = Router();

CategoryRouter.route("/")
	.get(CategoryController.getAllCategories)
	.post(CategoryController.createCategory)
	.delete(CategoryController.deleteCategory);

CategoryRouter.route("/tree/").get(CategoryController.getCategoryTree);

CategoryRouter.route("/:id/")
	.get(CategoryController.getCategory)
	// .put(CategoryController.updateCategory)
	.delete(CategoryController.deleteCategory);
