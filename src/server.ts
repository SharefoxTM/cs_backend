import axios from "axios";
import { app } from "./config/main.config";

require("dotenv").config();

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
