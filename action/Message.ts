"use server";
import { ApiAuth, ApiRoutes } from "./Api";

export async function sendDirectMessage(body: object) {
  try {
    const res = await new ApiAuth("/auth/user" + ApiRoutes.DirectMessage).post(
      body,
    );
    return res.json();
  } catch (error) {
    return {
      error: String(error),
    };
  }
}
