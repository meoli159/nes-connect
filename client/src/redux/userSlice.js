import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: [],
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    updateUsersStart: (state) => {
      state.users.isFetching = true;
    },
    updateUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers.map((user)  => {
        if (user._id === action.payload._id) {
          user.username = action.payload.username;
        }
       
      });
    },
    updateUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
