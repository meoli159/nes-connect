import { createSlice } from "@reduxjs/toolkit";
import { fetchMessagesThunk } from "./message/messageThunk";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    currentCommunity: {},
    messages: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    selectCommunity: (state, action) => {
      state.isFetching = false;
      state.currentCommunity = action.payload;
    },
    sendMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      state.messages= action.payload;
    });
  },
});

export const { selectCommunity, sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
