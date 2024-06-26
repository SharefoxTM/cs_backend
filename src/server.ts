import axios from "axios";
import { app } from "./config/main.config";

const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.dev";
dotenv.config({ path: envFile });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get("/", (req: any, res: any) => {
	res.send("Hello World!");
});

export const inventree = axios.create({
	baseURL: process.env.DB_HOST,
	headers: { Authorization: process.env.DB_TOKEN },
});
export const selfAccess = axios.create({
	baseURL: process.env.BE_SELF,
});
