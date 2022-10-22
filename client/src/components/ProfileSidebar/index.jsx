import React from "react";
import "./style.css";
import ServerLogo from "../../components/ServerLogo";
import { ButtonLogout } from "../../components/Button/ButtonLogout";
import ProfileSettingFunction from "../../components/ProfileSettingFunction";
import {logout} from "../../api/authService";
import { useDispatch, useSelector } from "react-redux";

function ProfileSidebar() {
  const user = useSelector((state) => state.auth?.currentUser);
  const id = user?._id;
  const dispatch = useDispatch();
  const logOut = () => {
    logout(dispatch, id);
  };

  return (
    <div className="sidebar-profile-wrapper">
      {/* Profile sidebar top */}

      <div className="sidebar-profile-header-wrapper">
        <ServerLogo />

        <div className="sidebar-profile-header-text">Connect</div>
      </div>

      {/* Profile sidebar body */}

      <div className="sidebar-profile-body-wrapper">
        <div className="sidebar-profile-body-text">
          <span>Settings</span>
        </div>

        <div className="separator7" />

        <div className="sidebar-profile-body-setting-wrapper">
          <ProfileSettingFunction />

          <div className="separator8" />

          <div className="user-log-out-button">
            <ButtonLogout onClick={logOut} buttonStyle="btn--outline">
              LOGOUT
            </ButtonLogout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
