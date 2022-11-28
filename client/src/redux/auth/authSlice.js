import { createSlice } from "@reduxjs/toolkit";
import { updateUserThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    pending: false,
    errorMessage: null,
  },
  reducers: {
    logOutSuccess: (state) => {
      state.currentUser = null;
    },
    loginSuccess:(state,action) =>{
      state.currentUser = action.payload;    
    },
    registerSuccess:(state)=>{
      state.errorMessage = null;
    },
    pending:(state)=>{
    state.errorMessage = null;
    },
    rejected: (state,action)=>{
      state.errorMessage = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
  },
});

export const { logOutSuccess,loginSuccess,registerSuccess,rejected,pending} = authSlice.actions;

export default authSlice.reducer;
