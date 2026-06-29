import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("Auth API", () => {
    it("should reject invalid register data", async () => {
        const res = await request(app).post("/auth/register").send({
            name: "Te",
            email: "invalid-email",
            password: "123"
        });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it("should register a user successfully", async () => {
        const res = await request(app).post("/auth/register").send({
            name: "Test User",
            email: `test${Date.now()}@example.com`, // unique email
            password: "123456"
        });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Successfully Registered.");
        expect(res.body.data.name).toBe("Test User");
        expect(res.body.data.email).toMatch(/@example\.com$/);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.role).toBeDefined();
    });
});