import { useSelector } from "react-redux";
import React from "react";
import MemberList from "../MemberList/Index";
import "./style.css";

function OtherContent() {
  const currentCommunity = useSelector((state) => state.messages?.currentCommunity);
  return (
    <div className="other-content-wrapper">
      <div className="other-content-container-top">
        <div className="right-server-chat-room-name-wrapper-2">
          <div className="server-chat-room-image-main-2">
            <img src="" alt="" />
          </div>

          <div className="server-chat-box-name-2">
            <span>{currentCommunity?.groupName}</span>
          </div>

          <button className="edit-chat-room-name">
            <i className="fas fa-pen"></i>
          </button>
        </div>
      </div>

      <div className="separator5" />

      <div className="other-content-preview">
        <div className="add-member-to-chat">
          <div className="add-member-to-chat-text">
            <span>Add people</span>
          </div>

          <button className="add-member-button">
            <i className="fas fa-user-plus"></i>
          </button>
        </div>

        <div className="delete-chat">
          <div className="delete-chat-text">
            <span>Detele chat</span>
          </div>

          <button className="delete-chat-button">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="separator6" />

      <div className="people-in-chat-text">
        <span>People in chat</span>
      </div>

      <div className="current-people-in-chat-list">
        <MemberList />
      </div>
    </div>
  );
}

export default OtherContent;
