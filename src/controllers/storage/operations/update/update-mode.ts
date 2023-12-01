import { Handler } from "express";
import net from "net";

export const updateMode: Handler = (req, res) => {
	const client = new net.Socket();
	client.connect(5050, "172.17.6.6", function () {
		client.write(JSON.stringify({ type: "vegas", mode: req.body.mode }));
	});

	client.on("data", function (data) {
		const recv = JSON.parse(data.toString());
		client.destroy(); // kill client after server's response
		res.json({ data: recv.out_come === "vegas" ? "success!" : "Error" });
	});
};
