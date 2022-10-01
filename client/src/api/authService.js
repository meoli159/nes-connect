import axiosClient from "./createInstance";
import {
  logOutSuccess,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailed,
} from "../redux/auth/authSlice";

export const register = (user) => {
 const res = axiosClient.post(`/auth/register`, user);
 return res.data
};

export const login = async (user) => {
  const res = await axiosClient.post(`/auth/login`, user);
  return res.data
};

const updateUser = async (user, accessToken, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await axiosClient.put(`/auth`, user, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(updateUsersSuccess(res.data));
  } catch (error) {
    dispatch(updateUsersFailed());
  }
};

export const logout = async (dispatch, id) => {
  await axiosClient.post(`/auth/logout`, id);
  dispatch(logOutSuccess());
};

const authService = {
  updateUser,
};

export default authService;
