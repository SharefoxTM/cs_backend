import { createCategory } from "./operations/create/create";
// import { deleteCategory } from "./operations/delete/delete";
import { getAllCategories } from "./operations/get-list/get-list";
import { getCategory } from "./operations/get/get";
import { getCategoryTree } from "./operations/get-tree/get-tree";
// import { updateCategory } from "./operations/update/update";

export default {
	getAllCategories,
	getCategory,
	getCategoryTree,
	createCategory,
	// updateCategory,
	// deleteCategory,
};
