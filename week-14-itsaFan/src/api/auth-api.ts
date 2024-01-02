import axios from "axios";
import { BASE_URL } from "./constant";
import { User } from "../helpers/api-interface";

export const registerApi = async (user: User) => {
  return await axios.post(`${BASE_URL}/register`, {
    username: user.username,
    email: user.email,
    password: user.password,
  });
};

export const loginApi = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserLoginApi = async (token: string) => {
  return await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
