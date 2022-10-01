import {
  login as loginAPI,
  register as registerAPI,
} from "../../api/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk("auth/login", async (user) => {
  return await loginAPI(user);
});

export const registerThunk = createAsyncThunk("auth/register", async (user) => {
  return registerAPI(user);
});
