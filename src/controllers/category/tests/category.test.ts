import axios, { AxiosHeaders } from "axios";
import { AxiosResponse } from "axios";

describe("GET", () => {
	it("should return the electronics category", async () => {
		jest.mock("axios");
		const response = await axios.get("http://localhost:8080/api/categories/1");
		expect(response.status).toBe(200);

		const data = expect(response.data);
		data.toHaveProperty("pk", 1);
		data.toHaveProperty("name", "Electronics");
		data.toHaveProperty("description");
		data.toHaveProperty("default_location");
		data.toHaveProperty("default_keywords");
		data.toHaveProperty("level", 0);
		data.toHaveProperty("parent", null);
		data.toHaveProperty("part_count");
		data.toHaveProperty("pathstring", "Electronics");
		data.toHaveProperty("starred", false);
		data.toHaveProperty("url", "/part/category/1/");
		data.toHaveProperty("structural", false);
		data.toHaveProperty("icon");
	});
});

describe("GET list", () => {
	it("should return a list of categories", async () => {
		jest.mock("axios");
		const response = await axios.get("http://localhost:8080/api/categories");
		expect(response.status).toBe(200);

		const data = expect(response.data);
		data.not.toHaveLength(1);
	});
});

describe("POST", () => {
	it("should create a new category", async () => {
		jest.mock("axios");
		const mockResponse: AxiosResponse = {
			status: 201,
			data: {
				pk: 1,
				name: "Test Category",
			},
			headers: {},
			statusText: "Created",
			config: {
				headers: new AxiosHeaders(),
			},
		};

		jest.spyOn(axios, "post").mockResolvedValue(mockResponse);

		const response = await axios.post("http://localhost:8080/api/categories", {
			name: "Test Category",
			description: "This is a test category",
		});

		expect(response.status).toBe(201);
		expect(response.data).toEqual({
			pk: 1,
			name: "Test Category",
		});
	});

	it("should handle errors when making a POST request", async () => {
		jest.mock("axios");

		const mockError: AxiosResponse = {
			status: 400,
			data: [
				{
					instancePath: "",
					schemaPath: "#/required",
					keyword: "required",
					params: {
						missingProperty: "name",
					},
					message: "must have required property 'name'",
				},
			],
			headers: {},
			statusText: "Bad Request",
			config: {
				headers: new AxiosHeaders(),
			},
		};

		jest.spyOn(axios, "post").mockRejectedValue(mockError);

		const err = await expect(
			axios.post("http://localhost:8080/api/categories", {
				description: "This is a test category",
			}),
		).rejects;
		err.toHaveProperty("data", mockError.data);
		err.toHaveProperty("status", 400);
	});
});
