import mongoose from "mongoose";
import { NextResponse } from "next/server";

import dbConnect from "@/app/api/libs/connection";
import { Product } from "@/app/api/models/Product";
import { GET, POST } from "@/app/api/product/route";

jest.mock("@/app/api/libs/imageHandler", () => ({
    uploads: jest.fn().mockResolvedValue({
        secure_url: "https://fake-url.com/image.jpg",
        public_id: "products/fake-id",
    }),
}));

beforeAll(async () => { await dbConnect(); });
afterEach(async () => { await Product.deleteMany({ name: "Jasmine Tea" }); });
afterAll(async () => { await mongoose.disconnect(); });

describe("GET /api/product", () => {
    it("should return a 200 status code and array of products", async () => {
        const response = await GET();
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "OK");
        expect(Array.isArray(json.data)).toBe(true);
    });
});

describe("POST /api/product", () => {
    it("should create product successfully", async () => {
        const fakeBuffer = Buffer.from("fake image content");

        const mockFile = {
            name: "test.jpg",
            type: "image/jpeg",
            arrayBuffer: async () => fakeBuffer,
        };

        const mockFormData = {
            get: (key: string) => {
                const values: Record<string, string | typeof mockFile> = {
                    name: "Jasmine Tea",
                    description: "Jasmine Tea with sweet sugar",
                    price: "5000",
                    stock: "100",
                    file: mockFile,
                };
                return values[key];
            },
        };

        const mockRequest = {
            formData: async () => mockFormData,
        } as unknown as Request;

        const response = await POST(mockRequest);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(201);

        const json = await response.json();
        expect(json).toHaveProperty("status", 201);
        expect(json).toHaveProperty("message", "Product created successfully");
        expect(json.data).toHaveProperty("name", "Jasmine Tea");
        expect(json.data).toHaveProperty("price", 5000);
        expect(json.data).toHaveProperty("stock", 100);
        expect(json.data).toHaveProperty("path");
    });
});
