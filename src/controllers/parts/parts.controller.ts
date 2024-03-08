//import functions and export default an object
import {
	getAllParts,
	getParameterTemplates,
	getPaginatedParts,
} from "./operations/get-list/get-list";
import { getPart, getParameterTemplate } from "./operations/get/get";
import { updatePart } from "./operations/update/update";
import { getDetails } from "./operations/get/get-details";
import { createPart, createParameter } from "./operations/create/create";
import { deletePart } from "./operations/delete/delete";

export default {
	getAllParts,
	getParameterTemplates,
	getPaginatedParts,
	getPart,
	getParameterTemplate,
	getDetails,
	createPart,
	createParameter,
	updatePart,
	deletePart,
};
