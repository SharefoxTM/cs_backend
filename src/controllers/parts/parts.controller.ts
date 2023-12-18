//import functions and export default an object
import { getAllParts, getPaginatedParts } from "./operations/get-list/get-list";
import { getPart } from "./operations/get/get";
import { updatePart } from "./operations/update/update";
import { getImage } from "./operations/get/get-image";
import { getDetails } from "./operations/get/get-details";

export default {
	getAllParts,
	getPaginatedParts,
	getPart,
	getDetails,
	getImage,
	// createCategory,
	updatePart,
	// deleteCategory,
};
