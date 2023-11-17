import { APICategory } from "../models/Category.model";
import { CategoryTree } from "../models/CategoryTree.model";

const mapTree = (categories: APICategory): CategoryTree => {
	const catTree: CategoryTree = categories.map((category) => ({
		pk: category.pk,
		name: category.name,
		part_count: category.part_count,
		children:
			category.children !== undefined ? mapTree(category.children) : undefined,
	}));
	return catTree;
};

export default {
	mapTree,
};
