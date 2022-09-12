import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "CommunityList",
  initialState: {
    communityList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getCommunityListStart: (state) => {
      state.isFetching = true;
    },
    getCommunityListSuccess: (state, action) => {
      state.isFetching = false;
      state.communityList = action.payload;
    },
    getCommunityListFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createStart: (state) => {
      state.isFetching = true;
    },
    createSuccess: (state, action) => {
      state.isFetching = false;
      state.communityList = [...state.communityList, action.payload];
    },
    createFails: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    renameCommunitySuccess: (state, action) => {
      state.communityList.map((community) => {
        if (community._id === action.payload._id) {
          community.communityName = action.payload.communityName;
        }
       
      });
     
    },
    fetchingFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCommunityListStart,
  getCommunityListSuccess,
  getCommunityListFailed,
  createStart,
  createSuccess,
  createFails,
  renameCommunitySuccess,
  fetchingFail,
} = communitySlice.actions;

export default communitySlice.reducer;
