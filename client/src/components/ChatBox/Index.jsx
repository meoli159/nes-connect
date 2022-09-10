import React, { useEffect, useState,createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { sendMessage } from "../../redux/messageSlice";
import messageService from "../../api/messageService";
import "./style.css";

import io from "socket.io-client";
const ENDPOINT = "ws://localhost:3333";
let socket, currentChattingWith;

export default function ChatBox() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const currentCommunity = useSelector((state) => state.messages?.currentCommunity);
  const messages = useSelector((state) => state.messages?.messages);
  const [textChat, setTextChat] = useState("");

  const dispatch = useDispatch();
  const scrollDiv = createRef();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected");
    
  }, []);

  const handleChatSubmit = (e) => {
    if (e.key === "Enter" && textChat) {
      messageService.sendMessages(
        { content: textChat, communityId: currentCommunity._id },
        user?.accessToken,
        socket,
        dispatch,
        axiosJWT
      );
      setTextChat("");
    }
  };


  useEffect(() => {
    //select chat so that user can join same community
    if (!currentCommunity._id) return;
    messageService.fetchMessages(
      currentCommunity?._id,
      user?.accessToken,
      socket,
      dispatch,
      axiosJWT
    );
    
  }, [currentCommunity?._id]);

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrollDiv.current);
  });

  // useEffect(() => {
  //   socket.off("message received").on("message received", (newMessageReceived) => {
  //     if (
  //       !currentChattingWith ||
  //       currentChattingWith._id !== newMessageReceived.group._id
  //     ) {
  //       console.log("not in");
  //     } else {
  //       dispatch(sendMessage(newMessageReceived));
  //     }
  //   });
  // }, []);

  return (
    <div className="main-room-wrapper">
      <div className="main-room-top">
        <div className="server-chat-box-name-wrapper-1">
          <div className="server-chat-room-image-main-1">
            <img src="" alt="" />
          </div>

          <div className="server-chat-box-name-1">
            <span>{currentCommunity?.communityName}</span>
          </div>
        </div>

        <button className="call-button">
          <i className="fa fa-phone"></i>
        </button>

        <button className="video-call-button">
          <i className="fas fa-video"></i>
        </button>
      </div>

      <div className="separator3" />

      <div ref={scrollDiv} className="main-room-chat-page">
        {messages?.map((el,index) => {
          return (
            <div className="message-received-wrapper" key={index}>
              <span className="message-user-name">
                {el.sender.username}
                <span className="time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </span>
              </span>

              <span className="message">
                <span>{el.content}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="separator4" />

      <div className="main-room-bottom">
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <div className="chat-input-icon">
              <input
                type="text"
                className="chat-input-text"
                value={textChat}
                onChange={(e) => setTextChat(e.target.value)}
                onKeyDown={handleChatSubmit}
                placeholder="Message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
