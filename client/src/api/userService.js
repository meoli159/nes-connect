
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
      const res = await axiosJWT.get(`api/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFailed());
    }
  };
  
  const deleteUser = async (accessToken, dispatch, id, navigate,axiosJWT) => {
    dispatch(deleteUserStart());
    try {
      const res = await axiosJWT.delete(`api/user/${id}` , {
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