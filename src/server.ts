import { app } from "./config/main.config";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get("/", async (req: any, res: any) => {
	res.send("Hello World!");
});
