//import functions and export default an object
import { createSupplierPart } from "./operations/create/create";
import {
	getSupplierList,
	getSupplierPartList,
} from "./operations/get-list/get-list";
import { setMoving } from "./operations/update/update";

export default {
	getSupplierPartList,
	getSupplierList,
	createSupplierPart,
	setMoving,
};
