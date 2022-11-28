import axiosClient from "./createInstance";
import {
  loginSuccess,
  logOutSuccess,
} from "../redux/auth/authSlice";

export const register = async (user) => {
  const res = await axiosClient.post(`/auth/register`, user);
  return res.data;
};

export const login = async (user,dispatch) => {
  const res = await axiosClient.post(`/auth/login`, user);
  dispatch(loginSuccess(res.data))
};

export const updateUser = async (user) => {
  const res = await axiosClient.put(`/auth`, user);
  return res.data;
};

export const logout = async (dispatch, id) => {
  await axiosClient.post(`/auth/logout`, id);
  dispatch(logOutSuccess());
};

export const forgotPassword = async (email) => {
return  await axiosClient.post(`/auth/forgotpassword`, email);

};

export const resetPassword = async (userId,forgotPasswordToken,password) => {
   const res = await axiosClient.post(`/auth/resetpassword/${userId}/${forgotPasswordToken}`,password);
   console.log(res) 
   return res.data
};


