import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { sendMessage } from "../../redux/messageSlice";
import messageService from "../../api/messageService";
import "./style.css";

import io from "socket.io-client";
const ENDPOINT = "https://nes-connect.herokuapp.com/ ";
var socket, currentChattingWith;

export default function ChatBox() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const messages = useSelector((state) => state.messages?.messages);
  const [sendNewMessage, setSendNewMessage] = useState("");

  // const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const fetchMessages = () => {
    if (!currentCommunity._id) return;

    messageService.fetchMessages(
      currentCommunity?._id,
      user?.accessToken,
     
      dispatch,
      axiosJWT
    );
    socket.emit("join chat", currentCommunity._id);
  };

  const sendAMessage = async (e) => {
    if (e.key === "Enter" && sendNewMessage) {
      await messageService.sendMessages(
        { content: sendNewMessage, groupId: currentCommunity._id },
        user?.accessToken,
        socket,
        dispatch,
        axiosJWT
      );
     setSendNewMessage("");
    }
      
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user._id);
  
    socket.on("connected");
  }, []);
  
  useEffect(() => {
    //select chat so that user can join same community
    fetchMessages();
    console.log(messages);
    currentChattingWith = currentCommunity;
  }, [currentCommunity?._id]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !currentChattingWith ||
        currentChattingWith._id !== newMessageReceived.group._id
      ) {
        //give notify
      } else {
        dispatch(sendMessage(newMessageReceived));
      }
    });
  }, []);

  return (
    <div className="main-room-wrapper">
      <div className="main-room-top">
        <div className="server-chat-box-name-wrapper-1">
          <div className="server-chat-room-image-main-1">
            <img src="" alt="" />
          </div>

          <div className="server-chat-box-name-1">
            <span>{currentCommunity?.groupName}</span>
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

      <div className="main-room-chat-page">
        {messages?.map((message) => {
          return (
            <div className="message-received-wrapper" key={message._id}>
              <span className="message-user-name">
                {message.sender.username}
                <span className="time">
                  {new Date(message.createdAt).getHours() +
                    ":" +
                    new Date(message.createdAt).getMinutes()}
                </span>
              </span>

              <span className="message">
                <span>{message.content}</span>
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
                value={sendNewMessage}
                onChange={(e) => setSendNewMessage(e.target.value)}
                onKeyDown={sendAMessage}
                placeholder="Message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
