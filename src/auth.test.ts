import { test, expect } from "bun:test";
import app from "./index";
import { randomUUID } from "crypto";

test("should login with email and password", async () => {
  const userData = {
    email: `user-${randomUUID()}@mail.com`,
    password: "123456",
  };

  const response = await app.handle(
    new Request(`http://localhost/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
  );

  expect(response.status).toEqual(200);

  const data = await response.json();

  expect(data).toHaveProperty("uid");
  expect(data.email).toBe(userData.email);
});
