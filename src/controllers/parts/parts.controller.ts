//import functions and export default an object
import {
	getAllParts,
	getParameterTemplates,
} from "./operations/get-list/get-list";
import { getPart, getParameterTemplate } from "./operations/get/get";
import { updatePart, updateThumbnail } from "./operations/update/update";
import { getDetails } from "./operations/get/get-details";
import { createPart, createParameter } from "./operations/create/create";
import { deletePart } from "./operations/delete/delete";

export default {
	getAllParts,
	getParameterTemplates,
	getPart,
	getParameterTemplate,
	getDetails,
	createPart,
	createParameter,
	updatePart,
	updateThumbnail,
	deletePart,
};
