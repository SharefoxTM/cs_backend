import { Request } from "express";
import { APICategory } from "../models/Category.model";
import { CategoryTree } from "../models/CategoryTree.model";
import { PartQuery } from "../models/PartQuery.model";

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

const mapQuery = (req: Request): PartQuery => {
	const query = req.query;
	const mappedQuery: PartQuery = {
		active:
			query.active === undefined ? undefined : query.active ? true : false,
		ancestor: query.ancestor?.toString(),
		assembly:
			query.assembly === undefined ? undefined : query.assembly ? true : false,
		category:
			query.category === undefined
				? undefined
				: parseInt(query.category.toString()),
		component:
			query?.component === undefined
				? undefined
				: query.component
				? true
				: false,
		convert_from: query.convert_from?.toString(),
		created_after: query.created_after?.toString(),
		created_before: query.created_before?.toString(),
		depleted_stock:
			query.depleted_stock === undefined
				? undefined
				: query.depleted_stock
				? true
				: false,
		exclude_tree: query.exclude_tree?.toString(),
		has_ipn:
			query.has_ipn === undefined ? undefined : query.has_ipn ? true : false,
		has_pricing:
			query.has_pricing === undefined
				? undefined
				: query.has_pricing
				? true
				: false,
		has_stock:
			query.has_stock === undefined
				? undefined
				: query.has_stock
				? true
				: false,
		has_units:
			query.has_units === undefined
				? undefined
				: query.has_units
				? true
				: false,
		in_bom_for: query.in_bom_for?.toString(),
		IPN: query.IPN?.toString(),
		IPN_regex: query.IPN_regex?.toString(),
		is_template:
			query.is_template === undefined
				? undefined
				: query.is_template
				? true
				: false,
		low_stock:
			query.low_stock === undefined
				? undefined
				: query.low_stock
				? true
				: false,
		name_regex: query.name_regex?.toString(),
		ordering: query.ordering?.toString(),
		purchaseable:
			query.purchaseable === undefined
				? undefined
				: query.purchaseable
				? true
				: false,
		salable:
			query.salable === undefined ? undefined : query.salable ? true : false,
		search: query.search?.toString(),
		stock_to_build:
			query.stock_to_build === undefined
				? undefined
				: query.stock_to_build
				? true
				: false,
		stocktake:
			query.stocktake === undefined
				? undefined
				: query.stocktake
				? true
				: false,
		tags_name: query.tags_name?.toString(),
		tags_slug: query.tags_slug?.toString(),
		trackable:
			query.trackable === undefined
				? undefined
				: query.trackable
				? true
				: false,
		unallocated_stock:
			query.unallocated_stock === undefined
				? undefined
				: query.unallocated_stock
				? true
				: false,
		variant_of:
			query.variant_of === undefined
				? undefined
				: parseInt(query.variant_of.toString()),
		virtual:
			query?.virtual === undefined ? undefined : query.virtual ? true : false,
	};
	return mappedQuery;
};

export default {
	mapTree,
	mapQuery,
};
