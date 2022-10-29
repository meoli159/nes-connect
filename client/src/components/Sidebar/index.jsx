import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import ServerChatRoom from "../ServerChatRoom";
import ServerAddButton from "../ServerAddButton";
import ServerLogo from "../ServerLogo";
import { FaSearch } from "react-icons/fa";

export default function Sidebar() {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className="side-bar-wrapper">
      <div className="sidebar-list-header-wrapper">
        <ServerLogo />

        <div className="sidebar-list-header-text">Connect</div>
      </div>

      <div className="separator1" />

      <div className="chat-place-wrapper">
        <ServerAddButton />

        <div className="sidebar-search-container">
          <div className="sidebar-search-input-wrapper">
            <div className="sidebar-search-input">
              <input
                className="sidebar-search-input-text"
                placeholder="Search"
                type="text"
              />

              <div className="sidebar-search-input-icon">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="server-chatroom-wrapper">
          <ServerChatRoom />
        </div>
      </div>

      <div className="separator2" />

      <div className="sidebar-bottom-wrapper">
        <div className="sidebar-bottom-content-wrapper">
          <Link to="/profile" style={{ color: "#FFF", textDecoration: "none" }}>
            <div className="sidebar-bottom-user">
              <div className="current-user-image img">
                <img src={user.pic} alt="" />
              </div>

              <div className="current-user-name-text">
                <span>{user.username}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
