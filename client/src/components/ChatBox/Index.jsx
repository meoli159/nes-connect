import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/messageSlice";
import messageService from "../../api/messageService";
import "./style.css";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:3333";
var socket, currentChattingWith;

export default function ChatBox() {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const currentCommunity = useSelector((state) => state.messages?.currentCommunity);
  const currentCommunityButton = useSelector((state)=> state.messages.currentCommunity?.communityName);
  const currentCommunityChatInput = useSelector((state)=> state.messages.currentCommunity?.communityName);

  const messages = useSelector((state) => state.messages?.messages);
  const [textChat, setTextChat] = useState("");

  const dispatch = useDispatch();
  const scrollDiv = createRef();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected");
  }, [user]);

  const handleChatSubmit = (e) => {
    if (e.key === "Enter" && textChat) {
      messageService.sendMessages(
        { content: textChat, communityId: currentCommunity._id },
        user?.accessToken,
        socket,
        dispatch
        
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
      dispatch
      
    );
    currentChattingWith = currentCommunity;
  }, [currentCommunity, dispatch, user?.accessToken]);

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrollDiv.current);
  }, [scrollDiv]);

  useEffect(() => {
    socket.on("received-message", (newMessageReceived) => {
      if (
        !currentChattingWith ||
        currentChattingWith._id !== newMessageReceived.community._id
      ) {
        console.log("no message!");
      } else {
        setTimeout(() => {
          dispatch(sendMessage(newMessageReceived));
        }, 3000);
      }
    });
  }, [dispatch]);

  return (
    <div className="chat-box-wrapper">
      <div className="chat-box-top ">
        <div className="chat-box-top-wrapper">

          <div className="chat-box-room-name">
            <span>{currentCommunity?.communityName}</span>
          </div>
        </div>

        {currentCommunityButton ? (
          <button className="call-button">
            <i className="fa fa-phone"></i>
          </button>
          ) : (
            <>
            </>
          )}

        {currentCommunityButton ? (
          <button className="video-call-button">
            <i className="fas fa-video"></i>
          </button>
          ) : (
            <>
            </>
          )}
        
      </div>

      <div className="separator3" />

      <div ref={scrollDiv} className="chat-box-page">
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

      {currentCommunityChatInput? (
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <div className="chat-input-content">
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
              ) : (
                <></>
              )}
      </div>
    </div>
  );
}
