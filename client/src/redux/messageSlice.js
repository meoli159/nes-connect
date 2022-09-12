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
    sendMessage: (state, action) => {
      state.messages = [...state.messages,action.payload];
      state.isFetching = false;
    },
    getMessageSuccess: (state, action) => {
      state.messages = action.payload;
      state.isFetching = false;
    },
    getMessageFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMessageStart,
  selectCommunity,
  getMessageSuccess,
  sendMessage,
  getMessageFailed,
} = messageSlice.actions;

export default messageSlice.reducer;
