import React, { useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import OtherFunctions from "../../components/OtherFunctions";
import ChatBox from "../../components/ChatBox";
import "./Community.css";
import { SocketContext } from "../../utils/context/SocketContext";
import { useSelector } from "react-redux";

export default function Community() {
  const user = useSelector((state) => state.auth?.currentUser);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit("connected", user._id);
  }, [socket, user]);
  return (
    <div className="app-wrapper">
      <Sidebar />

      <ChatBox />

      <OtherFunctions />
    </div>
  );
}
