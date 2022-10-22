import { createSlice } from "@reduxjs/toolkit";

const communityMemberSidebarSlice = createSlice({
  name: "communityMemberSidebarSlice",
  initialState: {
    selectedUser: null,
    showSidebar: true,
    showUserContextMenu: false,
    points: { x: 0, y: 0 },
  },
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleContextMenu: (state, action) => {
      state.showUserContextMenu = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setContextMenuLocation: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const {
  setContextMenuLocation,
  setSelectedUser,
  toggleSidebar,
  toggleContextMenu,
} = communityMemberSidebarSlice.actions;

export default communityMemberSidebarSlice.reducer;
