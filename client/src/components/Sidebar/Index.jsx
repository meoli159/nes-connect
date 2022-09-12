import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import ServerChatRoom from "../ServerChatRoom";
import ServerAddButton from "../ServerAddButton";
import ServerLogo from "../ServerLogo";

export default function Sidebar() {
  const user = useSelector((state) => state.auth.login?.currentUser);

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
                <i className="fa fa-search"></i>
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
                <img
                  src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg?fbclid=IwAR0gLORQDSkOYlg89GKCW0FboJc6Zv2CpboFkVlsg0YSqv2B1PsN4w3jSzA"
                  alt=""
                />
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
