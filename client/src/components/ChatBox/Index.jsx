import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/message/messageSlice";
import messageService from "../../api/messageService";
import "./style.css";
import { FaPhone, FaVideo } from "react-icons/fa";
import { useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { fetchMessagesThunk } from "../../redux/message/messageThunk";

export default function ChatBox() {
  let lastSenderId = undefined;
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
    dispatch(fetchMessagesThunk(currentCommunity._id)).then(() => {
      socket.emit("onCommunityJoin", currentCommunity);
    });
  }, [currentCommunity, currentCommunityName, dispatch, socket]);

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrollDiv.current);
  }, [scrollDiv]);

  useEffect(() => {
    socket.on("onReceivedMessage", (newMessageReceived) => {
      if (!newMessageReceived.community._id) {
        console.log("no message!");
      } else {
        dispatch(sendMessage(newMessageReceived));
      }
    });
  }, [dispatch, socket]);

  const mapMessages = (message) => {
    let showMessageHeader =
      !lastSenderId || message.sender._id !== lastSenderId;
    lastSenderId = message.sender._id;

    return (
      <div className="message-received-wrapper" key={message._id}>
        {showMessageHeader && (
          <div className="message-user-name-wrapper">
            <span className="sender-image img">
              <img src={message.sender.pic} alt="" />
            </span>
            <span className="message-user-name">
              {message.sender.username}
              <span className="time">
                {new Date(message.createdAt).getHours() +
                  ":" +
                  new Date(message.createdAt).getMinutes()}
              </span>
            </span>
          </div>
        )}
        <div className="message">
          <span>{message.content}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-box-wrapper">
      <div className="chat-box-top ">
        <div className="chat-box-top-wrapper">
          <div className="chat-box-room-name">
            <span>{currentCommunity?.communityName}</span>
          </div>
        </div>

        {currentCommunityName ? (
          <>
            <button className="call-button">
              <FaPhone />
            </button>
            <button className="video-call-button">
              <FaVideo />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="separator3" />

      <div ref={scrollDiv} className="chat-box-page">
        {messages.map(mapMessages)}
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
