import {
  getCommunityList as fetchCommunityAPI,
  createCommunity as createCommunityAPI,
  transferCommunityAdmin as transferCommunityAdminAPI,
  removeUserFromCommunity as removeUserFromCommunityAPI,
} from "../../api/communityService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommunityThunk = createAsyncThunk(
  "community/fetch",
  async () => {
    return await fetchCommunityAPI();
  }
);

export const createCommunityThunk = createAsyncThunk(
  "community/create",
  async (community) => {
    return await createCommunityAPI(community);
  }
);

export const transferCommunityAdminThunk = createAsyncThunk(
  "community/communityAdmin/update",
  async (data) => {
    return await transferCommunityAdminAPI(data.communityId,data.userId);
  }
);

export const removeUserFromCommunityThunk = createAsyncThunk(
  "community/removeUser",
  async (data) => {
    console.log(data.user)
    return await removeUserFromCommunityAPI(data.communityId,data.user);
  }
);
