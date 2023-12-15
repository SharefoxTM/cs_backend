//import functions and export default an object
import { createReel, initStorage } from "./operations/create/create";
import { getReelList } from "./operations/get-list/get-reelList";
import { getReel } from "./operations/get/get-reel";
import { updateMode } from "./operations/update/update-mode";

export default {
	updateMode,
	getReelList,
	getReel,
	createReel,
	initStorage,
};
