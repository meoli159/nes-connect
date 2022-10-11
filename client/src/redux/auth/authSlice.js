import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, updateUserThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    logOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
  },
});

export const { logOutSuccess } = authSlice.actions;

export default authSlice.reducer;
