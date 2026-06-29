import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("Task API", () => {
    it("should reject request without access token", async () => {
        const res = await request(app).get("/task");

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
    });

    it("should reject invalid task data", async () => {
        const res = await request(app).post("/task").send({
            title: "Te",
            content: "abc"
        });

        expect(res.status).toBeGreaterThanOrEqual(400);
    });
});