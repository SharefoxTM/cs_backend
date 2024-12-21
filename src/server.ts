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
	headers: { Authorization: "Token " + process.env.DB_TOKEN },
	proxy: {
		auth: { username: process.env.DB_PROXY_USER!, password: process.env.DB_PROXY_PASS! },
		host: process.env.DB_PROXY_HOST!,
		port: parseInt(process.env.DB_PROXY_PORT!),
		protocol: "http"
	}
});
export const selfAccess = axios.create({
	baseURL: process.env.BE_SELF,
});
