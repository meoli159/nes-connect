
import axios from "axios";
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
  } from "../redux/userSlice";

  const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await axios.get(`/api/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFailed());
    }
  };
  
  const deleteUser = async (accessToken, dispatch, id, navigate) => {
    dispatch(deleteUserStart());
    try {
      const res = await axios.delete(`/api/user/${id}` , {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      localStorage.clear();
      navigate("/login");
      window.dispatch(deleteUserSuccess(res.data));

    } catch (error) {
      dispatch(deleteUserFailed(error.response.data.message));
    }
  };

  const userService = {
    getAllUsers,
    deleteUser,
  };
  
  export default userService;