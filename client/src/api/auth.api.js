// src\api\auth.api.js

import api from "./client";

export const register = async (userDetails) => {
  const { data } = await api.post("/auth/register", userDetails);
  return data;
};

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
