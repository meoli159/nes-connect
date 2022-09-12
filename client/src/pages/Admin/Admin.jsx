import React, { useEffect } from "react";
import userService from "../../api/userService";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
export default function Admin() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
const navigate = useNavigate();


  const handleDelete = (_id) => {
    userService.deleteUser(user?.accessToken, dispatch, _id, navigate);
  };

  useEffect(() => {
    if (user?.accessToken) {
      userService.getAllUsers(user?.accessToken, dispatch);
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
