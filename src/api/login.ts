import { User } from "../types/user";
import { BASE_URL } from "./const";

type LoginResult = "success" | "fail";

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify(args),
  });
  return loginRes.ok ? "success" : "fail";
};

export const getCurrentUserInfo = async (): Promise<User | null> => {
  const userInfo = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
  });
  return userInfo ? userInfo.json() : null;
};
