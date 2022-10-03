import { fetchMessages as fetchMessagesAPI } from "../../api/messageService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch", async (communityId) => {
    return await fetchMessagesAPI(communityId);
  }
);
