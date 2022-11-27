import { createSlice } from "@reduxjs/toolkit";
import { selectCommunity } from "../message/messageSlice";
import { createCommunityThunk, fetchCommunityThunk, removeUserFromCommunityThunk, transferCommunityAdminThunk } from "./communityThunk";

const communitySlice = createSlice({
  name: "CommunityList",
  initialState: {
    communities: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    addCommunity: (state, action) => {
      state.communities.unshift(action.payload);
    },
    updateCommunity: (state, action) => {
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
      state.communities.map((community) => {
        if (community._id === action.payload._id) {
          community.communityName = action.payload.communityName;
        }
        return community;
      });
    },
    removeCommunity: (state, action) => {
      state.communities = [
        ...state.communities.filter(
          (c) => c._id !== action.payload._id
        ),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityThunk.fulfilled, (state, action) => {
        state.communities = action.payload;
      })
      .addCase(createCommunityThunk.fulfilled, (state, action) => {
        state.communities.unshift(action.payload.community);
      })
      .addCase(transferCommunityAdminThunk.fulfilled,selectCommunity.fulfilled,(state,action)=>{
        console.log(state)
      })
      .addCase(removeUserFromCommunityThunk.fulfilled,selectCommunity.fulfilled,(state,action)=>{
        console.log(state)
      })
  },
});

export const {
  addCommunity,
  updateCommunity,
  renameCommunitySuccess,
  removeCommunity,
} = communitySlice.actions;

export default communitySlice.reducer;
