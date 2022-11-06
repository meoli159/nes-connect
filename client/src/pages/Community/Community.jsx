import React, { useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import OtherFunctions from "../../components/OtherFunctions";
import ChatBox from "../../components/ChatBox";
import "./Community.css";
import { SocketContext } from "../../utils/context/SocketContext";

import {
  addCommunity,
  removeCommunity,
  updateCommunity,
} from "../../redux/community/communitySlice";
import { selectCommunity, sendMessage } from "../../redux/message/messageSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Community() {
  const user = useSelector((state) => state.auth?.currentUser);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("connected", user._id);

    socket.on("onReceivedMessage", (newMessageReceived) => {
      if (!newMessageReceived.community._id) {
        console.log("no message!");
      } else {
        dispatch(sendMessage(newMessageReceived));
      }
    });
    socket.on("onCommunityAdd", (payload) => {
      console.log("onCommunityAdd")
      dispatch(addCommunity(payload.community));
    });

    socket.on("onCommunityDeleted",(payload)=>{
      console.log("onCommunityDeleted")
      dispatch(removeCommunity(payload))
      dispatch(selectCommunity([null]));
    })
    socket.on("onCommunityReceiveNewUser", (payload) => {
      console.log("onCommunityReceiveNewUser")
      dispatch(updateCommunity(payload.community));
      if (payload.community._id === currentCommunity._id) {
        dispatch(selectCommunity(payload.community));
      }
    });

    socket.on("onCommunityAdminUpdate", (payload) => {
      dispatch(updateCommunity(payload));
      if (payload._id === currentCommunity._id) {
        dispatch(selectCommunity(payload));
      }
    });
    
    socket.on("onCommunityRemove", (payload) => {
      console.log("onCommunityRemove")
      dispatch(removeCommunity(payload.community));
      dispatch(selectCommunity([null]));
    });

    socket.on("onCommunityUserRemoved", (payload) => {
      console.log("onCommunityUserRemoved")
      dispatch(updateCommunity(payload.community));
      if (payload.community._id === currentCommunity._id) {
        dispatch(selectCommunity(payload.community));
      }
    });

    return () => {
      socket.off("onReceivedMessage");
      socket.off("onCommunityAdd");
      socket.off("onCommunityReceiveNewUser");
      socket.off("onCommunityAdminUpdate");
      socket.off("onCommunityRemove");
      socket.off("onCommunityUserRemoved");
    };
  }, [currentCommunity, dispatch, socket, user]);

  return (
    <div className="app-wrapper">
      <Sidebar />

      <ChatBox />

      <OtherFunctions />
    </div>
  );
}
