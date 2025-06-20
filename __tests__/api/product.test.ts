import mongoose from "mongoose";
import { NextResponse } from "next/server";

import dbConnect from "@/app/api/libs/connection";
import { Product } from "@/app/api/models/Product";
import { GET, POST } from "@/app/api/product/route";
import { GET as GETBYID, PUT, DELETE } from "@/app/api/product/[id]/route";

jest.mock("@/app/api/libs/imageHandler", () => ({
    uploads: jest.fn().mockResolvedValue({
        secure_url: "https://fake-url.com/image.jpg",
        public_id: "products/fake-id",
    }),
    destroy: jest.fn().mockResolvedValue(true),
}));


beforeAll(async () => { await dbConnect(); });
afterEach(async () => { await Product.deleteMany({ name: "Jasmine Tea" }); });
afterAll(async () => { await mongoose.disconnect(); });

const mockParams = async (id: string): Promise<{ id: string }> => Promise.resolve({ id });

describe("GET /api/product", () => {
    it("should return a 200 status code and array of products", async () => {
        const response = await GET();
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "OK");
        expect(Array.isArray(json.data)).toBe(true);
    });

    it("should return 404 if product not found", async () => {
        const mockRequest = {} as unknown as Request;

        const fakeId = new mongoose.Types.ObjectId().toString();

        const response = await GETBYID(mockRequest, { params: mockParams(fakeId as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "Product not found");
    });

    it("should return 400 invalid product id", async () => {
        const mockRequest = {} as unknown as Request;

        const response = await GETBYID(mockRequest, { params: mockParams("invalid-product-id" as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid product ID");
    });
});

describe("GET /api/product/[id]", () => {
    it("should return product successfully", async () => {
        const product = await Product.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Jasmine Tea",
            description: "Original Jasmine Tea",
            price: 5000,
            stock: 100,
            path: "products/fake-id",
            imagePublicId: "products/fake-id",
        });

        const mockRequest = {} as unknown as Request;

        const response = await GETBYID(mockRequest, { params: mockParams(product._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "OK");
        expect(json.data).toHaveProperty("name", "Jasmine Tea");
        expect(json.data).toHaveProperty("price", 5000);
        expect(json.data).toHaveProperty("stock", 100);
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


describe("PUT /api/product", () => {
    it("should update product successfully", async () => {

        const product = await Product.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Jasmine Tea",
            description: "Original Jasmine Tea",
            price: 5000,
            stock: 100,
            path: "products/fake-id",
            imagePublicId: "products/fake-id",
        });

        const mockFormData = {
            get: (key: string) => {
                const values: Record<string, string | null | File> = {
                    name: "Updated Jasmine Tea",
                    description: "Updated Description",
                    price: "3000",
                    stock: "80",
                    file: null,
                };
                return values[key];
            },
        };

        const mockRequest = {
            formData: async () => mockFormData,
        } as unknown as Request;

        const response = await PUT(mockRequest, { params: mockParams(product._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "Product Updated successfully");
        expect(json.data).toHaveProperty("name", "Updated Jasmine Tea");
        expect(json.data).toHaveProperty("price", 3000);
        expect(json.data).toHaveProperty("stock", 80);
    });

    it("should update product successfully with new image", async () => {
        const product = await Product.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Jasmine Tea",
            description: "Original Jasmine Tea",
            price: 5000,
            stock: 100,
            path: "products/old-id",
            imagePublicId: "products/old-id",
        });

        const fakeBuffer = Buffer.from("fake image content");

        const mockFile = {
            name: "test.jpg",
            type: "image/jpeg",
            size: 1024 * 1024,
            arrayBuffer: async () => fakeBuffer,
        };

        const mockFormData = {
            get: (key: string) => {
                const values: Record<string, string | typeof mockFile> = {
                    name: "Updated Jasmine Tea with Image",
                    description: "Updated with new image",
                    price: "7000",
                    stock: "120",
                    file: mockFile,
                };
                return values[key];
            },
        };

        const mockRequest = {
            formData: async () => mockFormData,
        } as unknown as Request;

        const response = await PUT(mockRequest, { params: Promise.resolve({ id: product._id.toString() }) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "Product Updated successfully");
        expect(json.data).toHaveProperty("name", "Updated Jasmine Tea with Image");
        expect(json.data).toHaveProperty("price", 7000);
        expect(json.data).toHaveProperty("stock", 120);

        expect(json.data).toHaveProperty("path", "https://fake-url.com/image.jpg");
        expect(json.data).toHaveProperty("imagePublicId", "products/fake-id");
    });

    it("should return 404 if product updated not found", async () => {
        const mockFormData = {
            get: (key: string) => {
                const values: Record<string, string | null> = {
                    name: "Updated Jasmine Tea",
                    description: "Updated Description",
                    price: "3000",
                    stock: "80",
                };
                return values[key];
            },
        };

        const mockRequest = {
            formData: async () => mockFormData,
        } as unknown as Request;

        const response = await PUT(mockRequest, { params: mockParams(new mongoose.Types.ObjectId().toString()) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "Product not found");
    });
});

describe("DELETE /api/product", () => {
    it("should delete product successfully", async () => {
        const product = await Product.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Jasmine Tea",
            description: "Original Jasmine Tea",
            price: 5000,
            stock: 100,
            path: "products/fake-id",
            imagePublicId: "products/fake-id",
        });

        const mockRequest = {} as unknown as Request;
        const response = await DELETE(mockRequest, { params: mockParams(product._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "Deleted successfully");
    });

    it("should return 404 if product deleted not found", async () => {
        const mockRequest = {} as unknown as Request;
        const response = await DELETE(mockRequest, { params: mockParams(new mongoose.Types.ObjectId().toString()) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "Product not found");
    });
});

