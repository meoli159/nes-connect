import React, { useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import OtherFunctions from "../../components/OtherFunctions";
import ChatBox from "../../components/ChatBox";
import "./Community.css";
import { SocketContext } from "../../utils/context/SocketContext";

import { addCommunity, AddUserToCommunity } from "../../redux/community/communitySlice";
import { selectCommunity } from "../../redux/message/messageSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Community() {
  const user = useSelector((state) => state.auth?.currentUser);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("connected", user._id);

    socket.on("onCommunityAdd", (payload) => {
      dispatch(addCommunity(payload.community));
    });

    socket.on("onCommunityReceiveNewUser", (payload) => {
      dispatch(AddUserToCommunity(payload.community))
      dispatch(selectCommunity(payload.community))
    });
    return(()=>{
      socket.off("onCommunityAdd")
      socket.off("onCommunityReceiveNewUser")
    })
  }, [dispatch, socket, user]);

  return (
    <div className="app-wrapper">
      <Sidebar />

      <ChatBox />

      <OtherFunctions />
    </div>
  );
}
