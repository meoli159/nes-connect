import React, { useEffect } from "react";
import { createAxios } from "../../api/createInstance";
import userService from "../../api/userService";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import {useNavigate} from "react-router-dom"
export default function Admin() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleDelete = (_id) => {
    userService.deleteUser(user?.accessToken, dispatch, _id, navigate,axiosJWT);
  };

  useEffect(() => {
    if (user?.accessToken) {
      userService.getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  return (
    <main>
      <h1>Admin</h1>
      <div>
        {userList?.map((user) => {
          return (
            <div key={user._id}>
              <h3>Hi {user.username}</h3>
              <button className="btn" onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {" "}
        <h1>{msg}</h1>
      </div>
    </main>
  );
}
