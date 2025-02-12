import axios from "axios";

describe("GET part", () => {
	it("when succes, fetches a single part", async () => {
		const expected = await axios
			.get("http://localhost:8080/api/parts/1/")
			.then((response) => expect(response.data));
		expected.toHaveProperty("pk", 1);
		expected.toHaveProperty("name");
		expected.toHaveProperty("active");
		expected.toHaveProperty("assembly");
		expected.toHaveProperty("barcode_hash");
		expected.toHaveProperty("category");
		expected.toHaveProperty("category_name");
		expected.toHaveProperty("component");
		expected.toHaveProperty("default_expiry");
		expected.toHaveProperty("description");
		expected.toHaveProperty("full_name");
		expected.toHaveProperty("image");
		expected.toHaveProperty("IPN");
		expected.toHaveProperty("is_template");
		expected.toHaveProperty("minimum_stock");
		expected.toHaveProperty("name");
		expected.toHaveProperty("purchaseable");
		expected.toHaveProperty("revision");
		expected.toHaveProperty("units");
		expected.toHaveProperty("variant_of");
		expected.toHaveProperty("virtual");
		expected.toHaveProperty("in_stock");
		expected.toHaveProperty("ordering");
		expected.toHaveProperty("required_for_build_orders");
		expected.toHaveProperty("stock_item_count");
		expected.toHaveProperty("suppliers");
		expected.toHaveProperty("total_in_stock");
		expected.toHaveProperty("variant_stock");
		expected.not.toHaveProperty("starred");
	});
});

describe("GET all parts", () => {
	it("when success, fetches a list of parts", async () => {
		const response = await axios.get("http://localhost:8080/api/parts/");
		expect(response.data).not.toBeUndefined();
	});

	it("when success, fetches a list of parts with pagination", async () => {
		const response = await axios.get(
			"http://localhost:8080/api/parts?limit=20",
		);
		expect(response.data).toHaveProperty("count");
	});
});
