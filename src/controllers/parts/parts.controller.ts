//import functions and export default an object
import { getAllParts } from "./operations/get-list/get-list";
import { getPart } from "./operations/get/get";
import { updatePart } from "./operations/update/update";
import { getImage } from "./operations/get-image/get-image";

export default {
	getAllParts,
	getPart,
	getImage,
	// createCategory,
	updatePart,
	// deleteCategory,
};
