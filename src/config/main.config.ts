import express from "express";

// 1) Import middlewares
// Users
// POST /api/users/resetPassword

// auth
// login (username & passw)
// refreshToken

// 2) Import the routers
import { CategoryRouter } from "../routes/categories.route";
import { PartRouter } from "../routes/parts.route";
import { StorageRouter } from "../routes/storage.route";
import { LocationRouter } from "../routes/location.route";
import { CompanyRouter } from "../routes/company.route";
// import { ManufacturerRouter } from "../routes/manufacturers.route";

export const app = express();
app.use(express.json());

app.use("/api/categories", CategoryRouter);
app.use("/api/parts", PartRouter);
app.use("/api/storage", StorageRouter);
app.use("/api/location", LocationRouter);
app.use("/api/company", CompanyRouter);
// app.use("/api/users", ManufacturerRouter);

// TODO: Catch all unknown routes
// app.all('*', (req, res, next) => {
//   next(new Error('Unknown route'));
// });

// 3) Start the server (--> server.ts)
