import React, { useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import OtherFunctions from "../../components/OtherFunctions";
import ChatBox from "../../components/ChatBox";
import "./Community.css";
import { SocketContext } from "../../utils/context/SocketContext";

import {
  addCommunity,
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
      console.log("onCommunityAdd");
      console.log(payload);
      dispatch(addCommunity(payload.community));
    });

    socket.on("onCommunityReceiveNewUser", (payload) => {
      console.log("onCommunityReceiveNewUser");
      console.log(payload.community);
      dispatch(updateCommunity(payload.community));
      if (payload.community._id === currentCommunity._id) {
        dispatch(selectCommunity(payload.community));
      }
    });

    socket.on("onCommunityAdminUpdate", (payload) => {
      console.log("on Community Admin Update");
      console.log(payload);
      dispatch(updateCommunity(payload));
      if (payload._id === currentCommunity._id) {
        dispatch(selectCommunity(payload));
      }
    });

    socket.on("onLeaveCommunity", (payload) => {
      console.log("onLeaveCommunity");
      console.log(payload);
      dispatch(updateCommunity(payload));
      dispatch(selectCommunity(payload));
    });

    return () => {
      socket.off("onReceivedMessage");
      socket.off("onCommunityAdd");
      socket.off("onCommunityReceiveNewUser");
      socket.off("onCommunityAdminUpdate");
    };
  }, [currentCommunity._id, dispatch, socket, user]);

  return (
    <div className="app-wrapper">
      <Sidebar />

      <ChatBox />

      <OtherFunctions />
    </div>
  );
}
