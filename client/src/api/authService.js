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


