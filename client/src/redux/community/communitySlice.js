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
    pending: (state) => {
      state.isFetching = true;
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
    .addCase(createCommunityThunk.fulfilled,(state,action)=>{
      state.communities.unshift(action.payload.community);
    })
  },
});

export const {
  renameCommunitySuccess,
  deleteCommunitySuccess,
  pending,
  fetchingFail,
} = communitySlice.actions;

export default communitySlice.reducer;
