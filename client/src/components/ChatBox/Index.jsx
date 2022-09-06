import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import messageService from "../../api/messageService";
import "./style.css";

import io from "socket.io-client";
import { sendMessage } from "../../redux/messageSlice";
const SERVER_POINT = "http://localhost:3000";
var socket, currentChattingWith;

export default function ChatBox() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const messages = useSelector((state) => state.messages?.messages);
  const [text, setText] = useState("");
 
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    socket = io(SERVER_POINT);
    socket.emit("setup", user);
    socket.on("connected");
  }, []);

  useEffect(() => {
    //select chat so that user can join same community
    if ( user?.accessToken && currentCommunity?._id) {
      messageService.fetchMessages(
        user?.accessToken,
        dispatch,
        currentCommunity?._id,
        socket,
        axiosJWT
      );
      currentChattingWith = currentCommunity?._id;
    }
  }, [currentCommunity?._id]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (currentChattingWith || currentChattingWith === newMessage.currentCommunity?._id) {
      let filter = msg=>{
        return msg.content.toLowerCase() === newMessage.content.toLowerCase() &&
        msg.sender === newMessage.sender
      }
      newMessage.groupId.awaitMessages(filter,{
        maxMatches:1,
        time: 5*1000
      })
      
        dispatch(sendMessage(newMessage));
        
      }
    
    });
  }, []);

  
  const handleOnEnter = (text) => {
    messageService.sendMessages(    
      { content: text, groupId: currentCommunity?._id },
      user?.accessToken,
      dispatch,
      socket,
      axiosJWT
    );
  };
  const handleKeyEnter = (e)=>{
    if(e.key ==='Enter'){
      handleOnEnter(text);
        setText('');
    }
   
  }
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyEnter}
                placeholder="Message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
