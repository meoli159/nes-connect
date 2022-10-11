
import axiosClient from "./createInstance";
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
  } from "../redux/userSlice";

  const deleteUser = async (accessToken, dispatch, id, navigate) => {
    dispatch(deleteUserStart());
    try {
      const res = await axiosClient.delete(`/user/${id}` , {
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
    deleteUser,
  };
  
  export default userService;