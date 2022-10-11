import axiosClient from "./createInstance";
import {
  logOutSuccess,
} from "../redux/auth/authSlice";

export const register = (user) => {
  const res = axiosClient.post(`/auth/register`, user);
  return res.data;
};

export const login = async (user) => {
  const res = await axiosClient.post(`/auth/login`, user);
  return res.data;
};

export const updateUser = async (user, accessToken, dispatch) => {
  const res = await axiosClient.put(`/auth`, user);
  return res.data;
};

export const logout = async (dispatch, id) => {
  await axiosClient.post(`/auth/logout`, id);
  dispatch(logOutSuccess());
};

