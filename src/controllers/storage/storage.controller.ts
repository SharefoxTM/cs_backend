//import functions and export default an object
import {
	createReel,
	initStorage,
	printLabel,
} from "./operations/create/create";
import { getReelList } from "./operations/get-list/get-reelList";
import { getReel, getReelByLocation } from "./operations/get/get-reel";
import { getStatus } from "./operations/get/get-status";
import { updateMode } from "./operations/update/update-mode";
import { patchReel } from "./operations/update/update-storage";

export default {
	updateMode,
	getReelList,
	getReel,
	getStatus,
	createReel,
	patchReel,
	initStorage,
	getReelByLocation,
	printLabel,
};
