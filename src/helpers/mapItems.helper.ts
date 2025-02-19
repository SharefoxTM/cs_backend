import { APICategory, CategoryTree } from "../models/Category.model";
import {
	Part,
	APIPart,
	APIPaginationPart,
	PaginationPart,
} from "../models/Part.model";
import {
	APIPartStock,
	PartStock,
	APIStockLocation,
	MovingStock,
} from "../models/Stock.model";
import { APIUsedIn, UsedIn } from "../models/UsedIn.model";
import { APILocation, APILocationDetail } from "../models/Location.model";
import { APISupplier, APISupplierDetail } from "../models/Supplier.model";
import validator from "./validateItems.helper";

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
	mapPart,
	mapPaginationParts,
	mapParts,
	mapStock,
	mapUsedIn,
	mapMovingStock,
	mapIPs,
	mapSuppliers,
};
