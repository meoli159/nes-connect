import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutSuccess,
} from "../redux/authSlice";

const register = (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    axios.post(`/api/auth/register`, user);
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

const logout = async (accessToken, dispatch, id) => {
  try {
    await axios.post(`/api/auth/logout`, id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    localStorage.removeItem("persist:root", "persist:auth");
    dispatch(logOutSuccess());
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
