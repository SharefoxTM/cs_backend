import { NewSupplierPart } from "../models/Company/NewSupplierPart.model";

const ip = (ip: string): boolean => {
	if (
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ip,
		)
	) {
		return true;
	}
	return false;
};

export default {
	ip,
};
