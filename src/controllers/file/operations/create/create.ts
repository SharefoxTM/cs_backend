const multer = require("multer");
const XLSX = require("xlsx");

export const importParts = (req: any, res: any) => {
	const storage = multer.memoryStorage();
	const upload = multer({ storage: storage }).single("file");

	upload(req, res, (err: any) => {
		if (err) {
			console.log(err);
			res.status(500);
		} else {
			const file = req.file.buffer;
			console.log(file);
			const raw_data = XLSX.utils.sheet_to_json(
				XLSX.read(file).Sheets[XLSX.read(file).SheetNames[0]],
				{ header: 1 },
			);
			console.log(raw_data[2]);
			res.status(201).json({ message: "Success" });
		}
	});
};
