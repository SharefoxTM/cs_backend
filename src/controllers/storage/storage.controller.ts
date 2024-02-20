//import functions and export default an object
import { createReel, initStorage } from "./operations/create/create";
import { getReelList } from "./operations/get-list/get-reelList";
import { getReel } from "./operations/get/get-reel";
import { getStatus } from "./operations/get/get-status";
import { updateMode } from "./operations/update/update-mode";

export default {
	updateMode,
	getReelList,
	getReel,
	getStatus,
	createReel,
	initStorage,
};
