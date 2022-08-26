import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createAxios } from "../../utils/createInstance";
import authService from "../../utils/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

export default function Admin() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user,dispatch,loginSuccess);

  const handleDelete = (id) => {
    authService.deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };
  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
    if (user?.accessToken) {
      authService.getAllUsers(user?.accessToken, dispatch, axiosJWT);
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
