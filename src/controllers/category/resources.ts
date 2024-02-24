import { APICategory } from "../../models/Category/Category.model";

const buildTree = (nodes: APICategory, parent: number | null): APICategory => {
	return nodes
		.filter((node) => node.parent === parent)
		.map((node) => {
			const children = buildTree(nodes, node.pk);
			return { ...node, node, children };
		});
};

export default {
    buildTree
};