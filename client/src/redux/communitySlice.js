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
  },
});

export const {
  getCommunityListStart,
  getCommunityListSuccess,
  getCommunityListFailed,
} = communitySlice.actions;

export default communitySlice.reducer;
