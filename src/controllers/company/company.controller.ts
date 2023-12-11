//import functions and export default an object
import { createSupplierPart } from "./operations/create/create";
import {
	getSupplierList,
	getSupplierPartList,
} from "./operations/get-list/get-list";

export default {
	getSupplierPartList,
	getSupplierList,
	createSupplierPart,
};
