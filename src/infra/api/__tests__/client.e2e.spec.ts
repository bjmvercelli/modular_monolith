import request from "supertest";
import { app } from "../express";

describe("Client E2E Test", () => {
  // it
  it("should create a client", async () => {
    // const
    const client = {
      name: "Client 1",
      email: "john@doe.com",
      city: "New York",
      complement: "apt 101",
      document: "123456789",
      number: "101",
      state: "NY",
      street: "5th Avenue",
      zipCode: "123456",
    };

    const res = await request(app).post("/clients").send(client)

    expect(res.status).toBe(201);
    expect(res.text).toBe("Client created");
  });
})