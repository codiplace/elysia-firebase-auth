import { Elysia, t } from "elysia";
import { auth } from "./lib/firebase-admin";

const CreateUserBody = t.Object({
  email: t.String({
    format: "email",
    error: "Email is required",
  }),
  password: t.String({ error: "Password is required" }),
});

const app = new Elysia()
  .post(
    "/users",
    async ({ body }) => {
      const { email, password } = body;

      const firebaseUser = await auth.createUser({ email, password });

      return firebaseUser;
    },
    {
      body: CreateUserBody,
    }
  )
  .get("/users/:uid", async ({ params }) => {
    const { uid } = params;

    const firebaseUser = await auth.getUser(uid);

    return firebaseUser;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
export default app;
