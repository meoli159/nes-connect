import {
  updateUser as updateUserApi
} from "../../api/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserThunk = createAsyncThunk("user/update", async (user) => {
  return updateUserApi(user);
});
