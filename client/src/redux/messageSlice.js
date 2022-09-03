import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    currentCommunity: [{}],
    messages: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getMessageStart: (state) => {
      state.isFetching = true;
    },
    selectCommunity: (state, action) => {
      state.isFetching = false;
      state.currentCommunity = action.payload;
    },
    getMessageSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCommunity = action.payload;
      state.messages = action.payload;
    },
    getMessageFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getMessageStart, selectCommunity,getMessageSuccess, getMessageFailed } =
  messageSlice.actions;

export default messageSlice.reducer;
