import { Request } from "express";
import { APICategory } from "../models/Category.model";
import { CategoryTree } from "../models/CategoryTree.model";
import { PartQuery } from "../models/PartQuery.model";
import { Part } from "../models/Part.model";
import { APIPart } from "../models/APIPart.model";
import { APIPartStock } from "../models/APIPartStock.model";
import { PartStock } from "../models/PartStock.model";
import { APIStockLocation } from "../models/APIStockLocation";
import { StockLocation } from "../models/StockLocation";

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

const mapPart = (apiPart: APIPart): Part => {
	const parts: Part = {
		active: apiPart.active,
		assembly: apiPart.assembly,
		barcode_hash: apiPart.barcode_hash,
		category: apiPart.category,
		component: apiPart.component,
		default_expiry: apiPart.default_expiry,
		default_location: apiPart.default_location,
		default_supplier: apiPart.default_location,
		description: apiPart.description,
		full_name: apiPart.full_name,
		image: apiPart.image,
		IPN: apiPart.IPN,
		is_template: apiPart.is_template,
		keywords: apiPart.keywords,
		minimum_stock: apiPart.minimum_stock,
		name: apiPart.name,
		pk: apiPart.pk,
		purchaseable: apiPart.purchaseable,
		revision: apiPart.revision,
		salable: apiPart.salable,
		starred: apiPart.starred,
		trackable: apiPart.trackable,
		units: apiPart.units,
		variant_of: apiPart.variant_of,
		virtual: apiPart.virtual,
		responsible: apiPart.responsible,
		allocated_to_build_orders: apiPart.allocated_to_build_orders,
		allocated_to_sales_orders: apiPart.allocated_to_sales_orders,
		building: apiPart.building,
		in_stock: apiPart.in_stock,
		ordering: apiPart.ordering,
		required_for_build_orders: apiPart.required_for_build_orders,
		stock_item_count: apiPart.stock_item_count,
		suppliers: apiPart.suppliers,
		total_in_stock: apiPart.total_in_stock,
		unallocated_stock: apiPart.unallocated_stock,
		variant_stock: apiPart.variant_stock,
		tags: apiPart.tags,
	};
	return parts;
};

const mapParts = (apiParts: APIPart[]): Part[] => {
	const parts: Part[] = apiParts.map((part) => ({
		active: part.active,
		assembly: part.assembly,
		barcode_hash: part.barcode_hash,
		category: part.category,
		component: part.component,
		default_expiry: part.default_expiry,
		default_location: part.default_location,
		default_supplier: part.default_location,
		description: part.description,
		full_name: part.full_name,
		image: part.image,
		IPN: part.IPN,
		is_template: part.is_template,
		keywords: part.keywords,
		minimum_stock: part.minimum_stock,
		name: part.name,
		pk: part.pk,
		purchaseable: part.purchaseable,
		revision: part.revision,
		salable: part.salable,
		starred: part.starred,
		trackable: part.trackable,
		units: part.units,
		variant_of: part.variant_of,
		virtual: part.virtual,
		responsible: part.responsible,
		allocated_to_build_orders: part.allocated_to_build_orders,
		allocated_to_sales_orders: part.allocated_to_sales_orders,
		building: part.building,
		in_stock: part.in_stock,
		ordering: part.ordering,
		required_for_build_orders: part.required_for_build_orders,
		stock_item_count: part.stock_item_count,
		suppliers: part.suppliers,
		total_in_stock: part.total_in_stock,
		unallocated_stock: part.unallocated_stock,
		variant_stock: part.variant_stock,
		tags: part.tags,
	}));
	return parts;
};

const mapPartStock = (apiPartStock: APIPartStock[]): PartStock[] => {
	const mappedStock: PartStock[] = apiPartStock.map((stock) => ({
		allocated: stock.allocated,
		barcode_hash: stock.barcode_hash,
		batch: stock.batch,
		build: stock.build,
		expired: stock.expired,
		expiry_date: stock.expiry_date,
		installed_items: stock.installed_items,
		is_building: stock.is_building,
		link: stock.link,
		location: stock.location,
		packaging: stock.packaging,
		part: stock.part,
		pk: stock.pk,
		purchase_price: stock.purchase_price,
		purchase_price_currency: stock.purchase_price_currency,
		quantity: stock.quantity,
		serial: stock.serial,
		stale: stock.stale,
		status: stock.status,
		status_text: stock.status_text,
		supplier_part: stock.supplier_part,
		tags: stock.tags,
		tracking_items: stock.tracking_items,
		updated: stock.updated,
	}));
	return mappedStock;
};

const mapStockLocation = (apiLocation: APIStockLocation): StockLocation => {
	const mappedLocation: StockLocation = {
		pk: apiLocation.pk,
		name: apiLocation.name,
		description: apiLocation.description,
		external: apiLocation.external,
		icon: apiLocation.icon,
		pathstring: apiLocation.pathstring,
		structural: apiLocation.structural,
		tags: apiLocation.tags,
	};
	return mappedLocation;
};

export default {
	mapTree,
	mapQuery,
	mapPart,
	mapParts,
	mapPartStock,
	mapStockLocation,
};
