import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../redux/authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "../redux/userSlice";

const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(`api/auth/register`, user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
    navigate("/app");
  } catch (error) {
    dispatch(loginFailed());
  }
};


const logout = async (accessToken, dispatch, id, axiosJWT) => {
  try {
    await axiosJWT.post(`/api/auth/logout`, id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
  } catch (error) {
    console.log(error);
  }
};

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

const authService = {
  getAllUsers,
  register,
  login,
  logout,
  deleteUser,
};

export default authService;
