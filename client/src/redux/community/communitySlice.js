import { createSlice } from "@reduxjs/toolkit";
import { createCommunityThunk, fetchCommunityThunk } from "./communityThunk";

const communitySlice = createSlice({
  name: "CommunityList",
  initialState: {
    communities: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    addCommunity: (sate, action) => {
      sate.communities.unshift(action.payload);
    },
    AddUserToCommunity: (state, action) => {
      const updatedCommunity = action.payload;
      const existCommunity = state.communities.find(
        (c) => c._id === updatedCommunity._id
      );
      const index = state.communities.findIndex(
        (c) => c._id === updatedCommunity._id
      );
      if (!existCommunity) return;
      state.communities[index] = updatedCommunity;
    },

    renameCommunitySuccess: (state, action) => {
      const communityL = state.communities.map((community) => {
        if (community._id === action.payload._id) {
          community.communityName = action.payload.communityName;
        }
        return communityL;
      });
    },
    deleteCommunitySuccess: (state, action) => {
      state.isFetching = false;
      state.communities = [
        ...state.communities.filter(
          (community) => community._id !== action.payload._id
        ),
      ];
    },
    fetchingFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityThunk.fulfilled, (state, action) => {
        state.communities = action.payload;
      })
      .addCase(createCommunityThunk.fulfilled, (state, action) => {
        state.communities.unshift(action.payload.community);
      });
  },
});

export const {
  addCommunity,
  AddUserToCommunity,
  renameCommunitySuccess,
  deleteCommunitySuccess,
  pending,
  fetchingFail,
} = communitySlice.actions;

export default communitySlice.reducer;
