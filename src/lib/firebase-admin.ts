import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp({
  projectId: "elysia-firebase-demo",
});

const auth = getAuth();

export { auth };
