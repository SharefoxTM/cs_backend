import { APICategory } from "../models/Category/APICategory.model";
import { CategoryTree } from "../models/Category/CategoryTree.model";
import { Part } from "../models/Part.model";
import { APIPart } from "../models/Part/APIPart.model";
import { APIPartStock } from "../models/Stock/APIPartStock.model";
import { PartStock } from "../models/Stock/PartStock.model";
import { APIBuildOrder } from "../models/BuildOrder/APIBuildOrder.model";
import { BuildOrder } from "../models/BuildOrder.model";
import { APIUsedIn } from "../models/UsedIn/APIUsedIn.model";
import { UsedIn } from "../models/UsedIn.model";
import { APIStockLocation } from "../models/Stock/APIStockLocation.model";
import { MovingStock } from "../models/Stock/MovingStock.model";
import { APILocation } from "../models/Location.model";
import { APILocationDetail } from "../models/Location/APILocationDetail.model";
import { APISupplier } from "../models/Supplier.model";
import { APISupplierDetail } from "../models/Company/APISupplierDetail.model";
import validator from "./validateItems.helper";
import {
	APIPaginationPart,
	PaginationPart,
} from "../models/Part/PaginationPart.model";

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

// const mapQuery = (req: Request): PartQuery => {
// 	const query = req.query;
// 	const mappedQuery: PartQuery = {
// 		active:
// 			query.active === undefined ? undefined : query.active ? true : false,
// 		ancestor: query.ancestor?.toString(),
// 		assembly:
// 			query.assembly === undefined ? undefined : query.assembly ? true : false,
// 		category:
// 			query.category === undefined
// 				? undefined
// 				: parseInt(query.category.toString()),
// 		component:
// 			query?.component === undefined
// 				? undefined
// 				: query.component
// 				? true
// 				: false,
// 		convert_from: query.convert_from?.toString(),
// 		created_after: query.created_after?.toString(),
// 		created_before: query.created_before?.toString(),
// 		depleted_stock:
// 			query.depleted_stock === undefined
// 				? undefined
// 				: query.depleted_stock
// 				? true
// 				: false,
// 		exclude_tree: query.exclude_tree?.toString(),
// 		has_ipn:
// 			query.has_ipn === undefined ? undefined : query.has_ipn ? true : false,
// 		has_pricing:
// 			query.has_pricing === undefined
// 				? undefined
// 				: query.has_pricing
// 				? true
// 				: false,
// 		has_stock:
// 			query.has_stock === undefined
// 				? undefined
// 				: query.has_stock
// 				? true
// 				: false,
// 		has_units:
// 			query.has_units === undefined
// 				? undefined
// 				: query.has_units
// 				? true
// 				: false,
// 		in_bom_for: query.in_bom_for?.toString(),
// 		IPN: query.IPN?.toString(),
// 		IPN_regex: query.IPN_regex?.toString(),
// 		is_template:
// 			query.is_template === undefined
// 				? undefined
// 				: query.is_template
// 				? true
// 				: false,
// 		low_stock:
// 			query.low_stock === undefined
// 				? undefined
// 				: query.low_stock
// 				? true
// 				: false,
// 		name_regex: query.name_regex?.toString(),
// 		ordering: query.ordering?.toString(),
// 		purchaseable:
// 			query.purchaseable === undefined
// 				? undefined
// 				: query.purchaseable
// 				? true
// 				: false,
// 		salable:
// 			query.salable === undefined ? undefined : query.salable ? true : false,
// 		search: query.search?.toString(),
// 		stock_to_build:
// 			query.stock_to_build === undefined
// 				? undefined
// 				: query.stock_to_build
// 				? true
// 				: false,
// 		stocktake:
// 			query.stocktake === undefined
// 				? undefined
// 				: query.stocktake
// 				? true
// 				: false,
// 		tags_name: query.tags_name?.toString(),
// 		tags_slug: query.tags_slug?.toString(),
// 		trackable:
// 			query.trackable === undefined
// 				? undefined
// 				: query.trackable
// 				? true
// 				: false,
// 		unallocated_stock:
// 			query.unallocated_stock === undefined
// 				? undefined
// 				: query.unallocated_stock
// 				? true
// 				: false,
// 		variant_of:
// 			query.variant_of === undefined
// 				? undefined
// 				: parseInt(query.variant_of.toString()),
// 		virtual:
// 			query?.virtual === undefined ? undefined : query.virtual ? true : false,
// 	};
// 	return mappedQuery;
// };

const mapPart = (apiPart: APIPart): Part => {
	const part: Part = {
		active: apiPart.active,
		assembly: apiPart.assembly,
		barcode_hash: apiPart.barcode_hash,
		category: apiPart.category,
		category_name: apiPart.category_name,
		component: apiPart.component,
		default_expiry: apiPart.default_expiry,
		description: apiPart.description,
		full_name: apiPart.full_name,
		image: apiPart.image,
		IPN: apiPart.IPN,
		is_template: apiPart.is_template,
		minimum_stock: apiPart.minimum_stock,
		name: apiPart.name,
		pk: apiPart.pk,
		purchaseable: apiPart.purchaseable,
		revision: apiPart.revision,
		units: apiPart.units,
		variant_of: apiPart.variant_of,
		virtual: apiPart.virtual,
		in_stock: apiPart.in_stock,
		ordering: apiPart.ordering,
		required_for_build_orders: apiPart.required_for_build_orders,
		stock_item_count: apiPart.stock_item_count,
		suppliers: apiPart.suppliers,
		total_in_stock: apiPart.total_in_stock,
		variant_stock: apiPart.variant_stock,
	};
	return part;
};

const mapParts = (apiParts: APIPart[]): Part[] => {
	const parts: Part[] = apiParts.map((part) => mapPart(part));
	return parts;
};

const mapPaginationParts = (apiParts: APIPaginationPart): PaginationPart => {
	const paginationParts = {
		count: apiParts.count,
		next: apiParts.next,
		previous: apiParts.previous,
		results: mapParts(apiParts.results),
	};
	return paginationParts;
};

const mapStock = (apiPartStock: APIPartStock[]): PartStock[] => {
	const mappedStock: PartStock[] = apiPartStock.map((stock) => ({
		allocated: stock.allocated,
		barcode_hash: stock.barcode_hash,
		batch: stock.batch,
		build: stock.build,
		expired: stock.expired,
		expiry_date: stock.expiry_date,
		installed_items: stock.installed_items,
		is_building: stock.is_building,
		LocationName:
			stock.location_detail === null ? null : stock.location_detail.pathstring,
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
		supplier_part_detail:
			stock.supplier_part_detail === null
				? null
				: {
						name: stock.supplier_part_detail.SKU,
						url: stock.supplier_part_detail.link,
				  },
		tags: stock.tags,
		tracking_items: stock.tracking_items,
		updated: stock.updated,
	}));
	return mappedStock;
};

const mapBuildOrders = (apiBO: APIBuildOrder[]): BuildOrder[] => {
	const mappedBO: BuildOrder[] = apiBO.map((bo) => ({
		build: bo.build,
		install_into: bo.install_into,
		stock_item: bo.stock_item,
		quantity: bo.quantity,
		build_detail: {
			pk: bo.build_detail.pk,
			url: bo.build_detail.url,
			title: bo.build_detail.title,
			barcode_hash: bo.build_detail.barcode_hash,
			batch: bo.build_detail.batch,
			creation_date: bo.build_detail.creation_date,
			completed: bo.build_detail.completed,
			completion_date: bo.build_detail.completion_date,
			destination: bo.build_detail.destination,
			parent: bo.build_detail.parent,
			part: bo.build_detail.part,
			project_code: bo.build_detail.project_code,
			project_code_detail: bo.build_detail.project_code_detail,
			reference: bo.build_detail.reference,
			quantity: bo.build_detail.quantity,
			status: bo.build_detail.status,
			status_text: bo.build_detail.status_text,
			target_date: bo.build_detail.target_date,
			take_from: bo.build_detail.take_from,
			priority: bo.build_detail.priority,
		},
	}));
	return mappedBO;
};

const mapUsedIn = (apiUsedIn: APIUsedIn[]): UsedIn[] => {
	const mappedUI: UsedIn[] = apiUsedIn.map((ui) => ({
		allow_variants: ui.allow_variants,
		consumable: ui.consumable,
		inherited: ui.inherited,
		optional: ui.optional,
		part_detail: {
			pk: ui.part_detail.pk,
			barcode_hash: ui.part_detail.barcode_hash,
			full_name: ui.part_detail.full_name,
			thumbnail: ui.part_detail.thumbnail,
			active: ui.part_detail.active,
			assembly: ui.part_detail.assembly,
			is_template: ui.part_detail.is_template,
			purchaseable: ui.part_detail.purchaseable,
			salable: ui.part_detail.salable,
			trackable: ui.part_detail.trackable,
			virtual: ui.part_detail.virtual,
			units: ui.part_detail.units,
		},
		quantity: ui.quantity,
	}));
	return mappedUI;
};

const mapMovingStock = (apistock: APIStockLocation[]): MovingStock[] => {
	const ms: MovingStock[] = apistock.map((as) => ({
		batch: as.batch,
		delete_on_deplete: as.delete_on_deplete,
		location_detail_pathstring: as.location_detail.pathstring,
		pk: as.pk,
		quantity: as.quantity,
		serial: as.serial,
		status: as.status,
		status_text: as.status_text,
		supplier_part_SKU: as.supplier_part_detail.SKU,
		barcode_hash: as.barcode_hash,
	}));
	return ms;
};

const mapIPs = (apilocation: APILocation[]): APILocationDetail[] => {
	const ip: APILocationDetail[] = apilocation
		.filter((al) => validator.ip(al.name))
		.map((al) => ({
			pk: al.pk,
			name: al.name,
			pathstring: al.pathstring,
		}));
	return ip;
};

const mapSuppliers = (apiSuppliers: APISupplier[]): APISupplierDetail[] => {
	const sd: APISupplierDetail[] = apiSuppliers.map((as) => ({
		pk: as.pk,
		name: as.name,
		description: as.description,
		image: as.image,
		url: as.url,
	}));
	return sd;
};

export default {
	mapTree,
	// mapQuery,
	mapPart,
	mapPaginationParts,
	mapParts,
	mapStock,
	mapBuildOrders,
	mapUsedIn,
	mapMovingStock,
	mapIPs,
	mapSuppliers,
};
