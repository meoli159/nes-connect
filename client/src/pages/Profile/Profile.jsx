import React, { useEffect, useContext } from "react";
import ProfileSidebar from "../../components/ProfileSidebar";
import UserProfile from "../../components/UserProfile/UserProfile";
import "./Profile.css";
import { SocketContext } from "../../utils/context/SocketContext";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth?.currentUser);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit("connected", user._id);
    socket.on("getUsers", (users) => {
      console.log(users);
    });
  }, [socket, user]);
  return (
    <div className="profile-page-wrapper">
      {/* Profile navbar */}

      <ProfileSidebar />

      {/* User profile content */}

      <UserProfile />
    </div>
  );
}

export default Profile;
