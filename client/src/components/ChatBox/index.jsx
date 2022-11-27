import React, { useEffect, useState, createRef } from "react";
import { formatRelative } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "../../api/messageService";
import "./style.css";
import { FaVideo } from "react-icons/fa";
import { useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { fetchMessagesThunk } from "../../redux/message/messageThunk";
import { useNavigate } from "react-router-dom";

export default function ChatBox() {
  const navigate = useNavigate();
  let lastSenderId = null;
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
      sendMessages(
        { content: textChat, communityId: currentCommunity._id },
        socket,
        dispatch
      );
      setTextChat("");
    }
  };

  useEffect(() => {
    //select chat so that user can join same community
    if (!currentCommunity._id) return;
    socket.emit("onCommunityJoin", currentCommunity);
    dispatch(fetchMessagesThunk(currentCommunity._id));
    return () => {
      socket.emit("onCommunityLeave", currentCommunity);
    };
  }, [currentCommunity, currentCommunityName, dispatch, socket]);

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrollDiv.current);
  }, [scrollDiv]);

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
                {formatRelative(new Date(message.createdAt), new Date())}
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
            <button className="video-call-button" onClick={() => { navigate(`/stream`) }}>
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
