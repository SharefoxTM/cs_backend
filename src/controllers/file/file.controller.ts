//import functions and export default an object
import { importParts } from "./operations/create/create";
import { getPaginatedThumbs } from "./operations/get-list/get-list";
import { getFile, getLabel, getThumb } from "./operations/get/get";

export default {
	getFile,
	getLabel,
	getThumb,
	getPaginatedThumbs,
	importParts,
};
