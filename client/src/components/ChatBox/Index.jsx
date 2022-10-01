import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/messageSlice";
import messageService from "../../api/messageService";
import "./style.css";
import { FaPhone, FaVideo } from "react-icons/fa";
import { useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";

export default function ChatBox() {
  const user = useSelector((state) => state.auth?.currentUser);
  const socket = useContext(SocketContext);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const currentCommunityName = currentCommunity?.communityName;

  const messages = useSelector((state) => state.messages?.messages);
  const [textChat, setTextChat] = useState("");

  const dispatch = useDispatch();
  const scrollDiv = createRef();

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected");
  }, [socket, user]);

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
  }, [currentCommunity, dispatch, socket, user?.accessToken]);

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrollDiv.current);
  }, [scrollDiv]);

  useEffect(() => {
    socket.on("received-message", (newMessageReceived) => {
      if (!newMessageReceived.community._id) {
        console.log("no message!");
      } else {
        dispatch(sendMessage(newMessageReceived));
      }
    });
  }, [dispatch, socket]);

  return (
    <div className="chat-box-wrapper">
      <div className="chat-box-top ">
        <div className="chat-box-top-wrapper">
          <div className="chat-box-room-name">
            <span>{currentCommunity?.communityName}</span>
          </div>
        </div>

        {currentCommunityName ? (
          <button className="call-button">
            <FaPhone />
          </button>
        ) : (
          <></>
        )}

        {currentCommunityName ? (
          <button className="video-call-button">
            <FaVideo />
          </button>
        ) : (
          <></>
        )}
      </div>

      <div className="separator3" />

      <div ref={scrollDiv} className="chat-box-page">
        {messages?.map((message, index) => {
          return (
            <div className="message-received-wrapper" key={message._id}>
              <div className="message-user-name-wrapper">
                <span className="message-user-name">
                  {message.sender.username}
                  <span className="time">
                    {new Date(message.createdAt).getHours() +
                      ":" +
                      new Date(message.createdAt).getMinutes()}
                  </span>
                </span>
              </div>

              <span className="message">
                <span>{message.content}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="separator4" />
      <div className="main-room-bottom">
        {currentCommunityName ? (
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
