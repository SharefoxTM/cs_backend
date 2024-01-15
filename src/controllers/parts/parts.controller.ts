//import functions and export default an object
import { getAllParts, getPaginatedParts } from "./operations/get-list/get-list";
import { getPart } from "./operations/get/get";
import { updatePart } from "./operations/update/update";
import { getDetails } from "./operations/get/get-details";
import { createPart } from "./operations/create/create";

export default {
	getAllParts,
	getPaginatedParts,
	getPart,
	getDetails,
	createPart,
	updatePart,
	// deleteCategory,
};
