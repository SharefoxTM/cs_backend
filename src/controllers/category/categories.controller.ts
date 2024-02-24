import { createCategory } from "./operations/create/create";
import { deleteCategory } from "./operations/delete/delete";
import { getAllCategories, getCategoryTree } from "./operations/get-list/get-list";
import { getCategory } from "./operations/get/get";
// import { updateCategory } from "./operations/update/update";

export default {
	getAllCategories,
	getCategory,
	getCategoryTree,
	createCategory,
	// updateCategory,
	deleteCategory,
};
