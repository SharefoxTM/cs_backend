import express from "express";

import { CategoryRouter } from "../routes/categories.route";
import { PartRouter } from "../routes/parts.route";
import { StorageRouter } from "../routes/storage.route";
import { LocationRouter } from "../routes/location.route";
import { CompanyRouter } from "../routes/company.route";
import { FileRouter } from "../routes/file.route";

export const app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
	next();
});

app.use("/api/categories", CategoryRouter);
app.use("/api/parts", PartRouter);
app.use("/api/storage", StorageRouter);
app.use("/api/location", LocationRouter);
app.use("/api/company", CompanyRouter);
app.use("/api/file", FileRouter);
