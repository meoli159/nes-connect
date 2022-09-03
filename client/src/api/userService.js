import axios from "axios";
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
  } from "../redux/userSlice";

  const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
      const res = await axiosJWT.get("api/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFailed());
    }
  };
  
  const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
      const res = await axiosJWT.delete(`api/user/` + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      localStorage.removeItem();
      dispatch(deleteUserSuccess(res.data));
    } catch (error) {
      dispatch(deleteUserFailed(error.response.data));
    }
  };

  const userService = {
    getAllUsers,
    deleteUser,
  };
  
  export default userService;