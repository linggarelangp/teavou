import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/libs/db/connection";

import { validateProductData } from "@/app/validators";
import { Product } from "@/app/models/Product";
import { GET, POST } from "@/app/api/product/route";
import { GET as GETBYID, PUT, DELETE } from "@/app/api/product/[id]/route";

jest.mock("@/app/libs/cloudinary.helper", () => ({
    uploads: jest.fn().mockResolvedValue({
        secure_url: "https://fake-url.com/image.jpg",
        public_id: "products/fake-id",
    }),
    destroy: jest.fn().mockResolvedValue(true),
}));

beforeAll(async () => { await connection(); });
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
});

describe("GET /api/product/[id]", () => {
    const mockRequest = {} as unknown as Request;

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

    it("should return 404 if product not found", async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();

        const response = await GETBYID(mockRequest, { params: mockParams(fakeId as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "Product not found");
    });

    it("should return 400 invalid product id", async () => {
        const response = await GETBYID(mockRequest, { params: mockParams("invalid-product-id" as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid product ID");
    });
});

describe("POST /api/product", () => {
    it("should create product successfully", async () => {
        const formData = new FormData();
        formData.set("name", "Jasmine Tea");
        formData.set("price", "5000");
        formData.set("stock", "100");

        const mockFile = new File(["dummy content"], "test.jpg", { type: "image/jpeg" });
        formData.set("file", mockFile);

        const mockRequest = { formData: async () => formData } as unknown as NextRequest;

        const validationResponse = await validateProductData(mockRequest, true);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

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

    it("should return 400 when file is missing", async () => {
        const formData = new FormData();
        formData.set("name", "Jasmine Tea");
        formData.set("price", "5000");
        formData.set("stock", "100");

        const mockRequest = { formData: async () => formData } as unknown as NextRequest;

        const response = await validateProductData(mockRequest, true);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Bad Request");
        expect(json).toHaveProperty("errors");
        expect(Array.isArray(json.errors)).toBe(true);
        expect(json.errors.length).toBeGreaterThan(0);
        expect(json.errors[0]).toHaveProperty("path");
        expect(json.errors[0]).toHaveProperty("message");
        expect(json.errors[0].message).toBe("File is required");

    });

    it("should return 400 when file is not an image", async () => {
        const formData = new FormData();
        formData.set("name", "Jasmine Tea");
        formData.set("price", "5000");
        formData.set("stock", "100");

        const fakeFile = new File(["hello"], "document-fake-file.pdf", { type: "application/pdf" });
        formData.set("file", fakeFile);

        const mockRequest = { formData: async () => formData } as unknown as NextRequest;

        const response = await validateProductData(mockRequest, true);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Bad Request");
        expect(json).toHaveProperty("errors");
        expect(Array.isArray(json.errors)).toBe(true);
        expect(json.errors.length).toBeGreaterThan(0);
        expect(json.errors[0]).toHaveProperty("path");
        expect(json.errors[0]).toHaveProperty("message");
        expect(json.errors[0].message).toBe("File must be an image");
    });

    it("should return 400 when image file is too large", async () => {
        const formData = new FormData();
        formData.set("name", "Jasmine Tea");
        formData.set("price", "5000");
        formData.set("stock", "100");

        const mockFile = new File(["a".repeat(1024 * 1024 * 6)], "test-large.jpg", { type: "image/jpeg" });
        formData.set("file", mockFile);

        const mockRequest = { formData: async () => formData } as unknown as NextRequest;

        const response = await validateProductData(mockRequest, true);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Bad Request");
        expect(json).toHaveProperty("errors");
        expect(Array.isArray(json.errors)).toBe(true);
        expect(json.errors.length).toBeGreaterThan(0);
        expect(json.errors[0]).toHaveProperty("path");
        expect(json.errors[0]).toHaveProperty("message");
        expect(json.errors[0].message).toBe("Image size exceeds 5MB limit");
    });

    it("should return 400 when request body is empty", async () => {
        const mockRequest = { formData: async () => new FormData() } as unknown as NextRequest;

        const response = await validateProductData(mockRequest, true);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Request body is required");
    });
});


describe("PUT /api/product", () => {
    it("should return 400 invalid product id", async () => {
        const formData = new FormData();
        formData.set("name", "Updated Jasmine Tea");
        formData.set("description", "Updated Description");
        formData.set("price", "3000");
        formData.set("stock", "80");

        const mockRequest = { formData: async () => formData, } as unknown as NextRequest;

        const response = await PUT(mockRequest, { params: mockParams("invalid-product-id" as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid product ID");
    });

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

        const formData = new FormData();
        formData.set("name", "Updated Jasmine Tea");
        formData.set("description", "Updated Description");
        formData.set("price", "3000");
        formData.set("stock", "80");

        const mockRequest = { formData: async () => formData, } as unknown as NextRequest;

        const validationResponse = await validateProductData(mockRequest, false);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

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

        const formData = new FormData();
        formData.set("name", "Updated Jasmine Tea with Image");
        formData.set("description", "Updated with new image");
        formData.set("price", "7000");
        formData.set("stock", "120");

        const mockFile = new File(["dummy content"], "test-put.jpg", { type: "image/jpeg" });
        formData.set("file", mockFile);

        const mockRequest = { formData: async () => formData, } as unknown as NextRequest;

        const validationResponse = await validateProductData(mockRequest, false);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

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
        const formData = new FormData();
        formData.set("name", "Updated Jasmine Tea");
        formData.set("description", "Updated Description");
        formData.set("price", "3000");
        formData.set("stock", "80");

        const mockRequest = { formData: async () => formData, } as unknown as NextRequest;

        const response = await PUT(mockRequest, { params: mockParams(new mongoose.Types.ObjectId().toString()) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "Product not found");
    });

    it("should return 400 when file is not an image", async () => {
        const formData = new FormData();
        formData.set("name", "Updated Jasmine Tea");
        formData.set("price", "5000");
        formData.set("stock", "100");

        const fakeFile = new File(["hello"], "document-fake-file.pdf", { type: "application/pdf" });
        formData.set("file", fakeFile);

        const mockRequest = { formData: async () => formData, } as unknown as NextRequest;

        const response = await validateProductData(mockRequest, false);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();

        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Bad Request");
        expect(json).toHaveProperty("errors");
        expect(Array.isArray(json.errors)).toBe(true);
        expect(json.errors.length).toBeGreaterThan(0);
        expect(json.errors[0]).toHaveProperty("path");
        expect(json.errors[0]).toHaveProperty("message");
        expect(json.errors[0].message).toBe("File must be an image");
    });

    it("should return 400 when image file is too large", async () => {
        const formData = new FormData();
        formData.set("name", "Updated Jasmine Tea");
        formData.set("price", "5000");
        formData.set("stock", "100");

        const mockFile = new File(["a".repeat(1024 * 1024 * 6)], "test-large.jpg", { type: "image/jpeg" });
        formData.set("file", mockFile);

        const mockRequest = { formData: async () => formData, } as unknown as NextRequest;

        const response = await validateProductData(mockRequest, false);
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Bad Request");
        expect(json).toHaveProperty("errors");
        expect(Array.isArray(json.errors)).toBe(true);
        expect(json.errors.length).toBeGreaterThan(0);
        expect(json.errors[0]).toHaveProperty("path");
        expect(json.errors[0]).toHaveProperty("message");
        expect(json.errors[0].message).toBe("Image size exceeds 5MB limit");
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

    it("should return 400 invalid product id", async () => {
        const mockRequest = {} as unknown as Request;
        const response = await DELETE(mockRequest, { params: mockParams("invalid-product-id" as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid product ID");
    });
});