import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/libs/db/connection";

import { validateUserData } from "@/app/validators";
import { User } from "@/app/models/User";
import { GET, POST } from "@/app/api/user/route";
import { DELETE, GET as GET_USER, PUT, } from "@/app/api/user/[id]/route"
import { hashPassword } from "@/app/libs";

beforeAll(async () => { await connection() });
afterEach(async () => { await User.deleteMany({ name: "Test User" }); });
afterAll(async () => { await mongoose.connection.close(); });

const mockParams = async (id: string): Promise<{ id: string }> => Promise.resolve({ id });

describe("GET /api/user", () => {
    it("should return a list of users", async () => {
        const response = await GET();

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "OK");
        expect(Array.isArray(json.data)).toBe(true);
    });
});

describe("GET /api/user/[id]", () => {
    const mockRequest = {} as unknown as NextRequest;

    it("should return user successfully", async () => {
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Test User",
            email: "test.user@test.com",
            password: "testUserPassword123#$",
            role: "user"
        })

        const response = await GET_USER(mockRequest, { params: mockParams(user._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "OK");
        expect(json.data).toHaveProperty("name", "Test User");
        expect(json.data).toHaveProperty("email", "test.user@test.com");
        expect(json.data).not.toHaveProperty("password");
        expect(json.data).toHaveProperty("role", "user");
    });

    it("should return 404 when user not found", async () => {
        const fakeUserId = new mongoose.Types.ObjectId().toString();

        const response = await GET_USER(mockRequest, { params: mockParams(fakeUserId) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "User not found");
    });

    it("should return 400 when invalid user id", async () => {
        const response = await GET_USER(mockRequest, { params: mockParams("invalid-id") });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid User ID");
    });
});

describe("POST /api/user", () => {
    type CreateMockUser = { name: string; email: string; password?: string; role: string };

    const createMockUser: CreateMockUser = {
        name: "Test User",
        email: "test.user@test.com",
        password: "TestUserPassword123#$",
        role: "user",
    }

    it("should create a new user successfully", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        const validationResponse = await validateUserData(mockRequest);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

        const response = await POST(mockRequest);

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(201);

        const json = await response.json();
        expect(json).toHaveProperty("status", 201);
        expect(json).toHaveProperty("message", "Created");
        expect(json.data).toHaveProperty("_id");
        expect(json.data).toHaveProperty("name", "Test User");
        expect(json.data).toHaveProperty("email", "test.user@test.com");
        expect(json.data).not.toHaveProperty("password");
        expect(json.data).toHaveProperty("role", "user");
    });

    it("should return 400 when user already exists", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Test User",
            email: "test.user@test.com",
            password: "TestUserPassword123#$",
            role: "user",
        });

        const validationResponse = await validateUserData(mockRequest);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

        const response = await POST(mockRequest);

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "User already exists with this email");
    });

    it("should return 400 when request body is empty", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue(undefined)
        } as unknown as NextRequest;

        const response = await validateUserData(mockRequest);

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Request body is required");
    });

    it("should return 400 when required fields are missing", async () => {
        delete createMockUser.password;
        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        const response = await validateUserData(mockRequest);

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
    });
});

describe("PUT /api/user/[id]", () => {
    type CreateMockUser = { name: string; email: string; password?: string; role: string };

    const createMockUser: CreateMockUser = {
        name: "Test User",
        email: "test.user.updated@test.com",
        password: "TestUserPasswordUpdated123#$",
        role: "user",
    }

    it("should return 400 when user id is invalid", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        const validationResponse = await validateUserData(mockRequest);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

        const response = await PUT(mockRequest, { params: mockParams("invalid-product-id" as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid User ID");
    });


    it("should update user successfully", async () => {
        const password = "TestUserPasswordUpdated123#$";
        const hashedPassword: string = await hashPassword(password);

        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Test User",
            email: "test.user@test.com",
            password: hashedPassword,
            role: "user",
        });

        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        const validationResponse = await validateUserData(mockRequest);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

        const response = await PUT(mockRequest, { params: mockParams(user._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "User Updated successfully");
        expect(json.data).toHaveProperty("_id", user._id.toString());
        expect(json.data).toHaveProperty("name", "Test User");
        expect(json.data).toHaveProperty("email", "test.user.updated@test.com");
        expect(json.data).not.toHaveProperty("password");
        expect(json.data).toHaveProperty("role", "user");
    });

    it("should return 404 when user not found", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        const validationResponse = await validateUserData(mockRequest);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

        const fakeUserId = new mongoose.Types.ObjectId().toString();
        const response = await PUT(mockRequest, { params: mockParams(fakeUserId) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "User not found");
    });

    it("should return 400 when password is incorrect", async () => {
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Test User",
            email: "test.user@test.com",
            password: "TestUserPassword123#$",
            role: "user",
        });

        const mockRequest = {
            json: jest.fn().mockResolvedValue(createMockUser)
        } as unknown as NextRequest;

        const validationResponse = await validateUserData(mockRequest);
        expect(validationResponse).toBeDefined();
        expect(validationResponse).toBeInstanceOf(NextResponse);
        expect(validationResponse.status).not.toBe(400);

        const response = await PUT(mockRequest, { params: mockParams(user._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Incorrect password");
    });
});

describe("DELETE /api/user/[id]", () => {
    const mockRequest = {} as unknown as NextRequest;

    it("should return 400 when user id is invalid", async () => {
        const response = await DELETE(mockRequest, { params: mockParams("invalid-user-id" as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json).toHaveProperty("status", 400);
        expect(json).toHaveProperty("message", "Invalid User ID");
    });

    it("should delete user successfully", async () => {
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Test User",
            email: "test.user@test.com",
            password: "TestUserPasswordUpdated123#$",
            role: "user",
        });

        const response = await DELETE(mockRequest, { params: mockParams(user._id as string) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty("status", 200);
        expect(json).toHaveProperty("message", "User deleted successfully");
        expect(json.data).toBeUndefined();

    });

    it("should return 404 when user not found", async () => {
        const fakeUserId = new mongoose.Types.ObjectId().toString();
        const response = await DELETE(mockRequest, { params: mockParams(fakeUserId) });

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const json = await response.json();
        expect(json).toHaveProperty("status", 404);
        expect(json).toHaveProperty("message", "User not found");
    });
});