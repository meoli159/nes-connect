import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./Profile.css";
import ChangeUserNameModal from "../../components/Modal/ChangeUserNameModal";
import ChangeUserEmailModal from "../../components/Modal/ChangeUserEmailModal";
import ChangePassWordModal from "../../components/Modal/ChangePassWordModal";
import ServerLogo from "../../components/ServerLogo";
import { ButtonLogout } from "../../components/Button/ButtonLogout";
import ProfileSettingFunction from "../../components/ProfileSettingFunction";
import authService from "../../api/authService";


function Profile() {

  const user = useSelector((state) => state.auth.login?.currentUser);
  const id = user?._id;

  const [openChangeUserNameModal, setOpenChangeUserNameModal] = useState(false);
  const [openChangeUserEmailModal, setOpenChangeUserEmailModal] = useState(false);
  const [openChangePassWordModal, setOpenChangePassWordModal] = useState(false);

  const dispatch = useDispatch();
  const logOut = () => {
    authService.logout(user?.accessToken, dispatch, id);
  };
  
  return (
    <div className='profile-page-wrapper'>

      {/* Profile navbar */}

      <div className="navbar-profile-wrapper">

        <div className="navbar-profile-header-wrapper">

          <ServerLogo />

          <div className="navbar-profile-header-text">
            Connect
          </div>

        </div>

        {/* Profile navbar body */}    

        <div className="navbar-profile-body-wrapper">

          <div className="navbar-profile-body-text">
            <span>
              Settings
            </span>
          </div>

          <div className="separator7" />

          <div className="navbar-profile-body-setting-wrapper">
            <ProfileSettingFunction />

            <div className='separator8' />

           <div className="user-log-out-button">
              <ButtonLogout onClick={logOut} buttonStyle="btn--outline">
                LOGOUT
              </ButtonLogout>
            </div>

          </div>

        </div>

      </div>

    {/* User profile content */}

      <div className="profile-form">
      <div className="profile-form-wrapper">

        <div className='profile-form-content'>

          {/* User image */}

          <div className='profile-user-image'>
            <img src='/' alt='' />
            
            <button className='upload-image-file'>
              <i className="fas fa-camera"></i>
              <input type="file" />
            </button>
          </div>

          {/* User name */}

          <div className='profile-user-name'>
            <span>
              {user.username}
            </span>
          </div>

          {/* Change user name */}
 
          <div className="user-name-title-wrapper">
            <div className="user-name-title">
              <p>Username:</p>
              <span className="user-name">
                {user.username} 
              </span>
            </div>

            <button className="change-user-name-button" onClick={() => {setOpenChangeUserNameModal(true)}}>
              Change
            </button>

            {openChangeUserNameModal && <ChangeUserNameModal closeChangeUserNameModal={setOpenChangeUserNameModal}/>}

          </div>

          {/* Change user email */}

          <div className="user-email-title-wrapper">
            <div className="user-email-title">
              <p>Email:</p>
              <span className="user-email">
                Huytrandn@gmail.com
              </span>
            </div>

            <button className="change-user-email-button" onClick={() => {setOpenChangeUserEmailModal(true)}}>
              Change
            </button>
            
            {openChangeUserEmailModal && <ChangeUserEmailModal closeChangeUserEmailModal={setOpenChangeUserEmailModal}/>}

          </div>

          {/* Change user password */}

          <div className="user-password-title-wrapper">
            <div className="user-password-title">
              <span className="user-password">
                Password setting
              </span>
              
            </div>

            <button className="change-user-password-button" onClick={() => {setOpenChangePassWordModal(true)}}>
              Change
            </button>

            {openChangePassWordModal && <ChangePassWordModal closeChangePassWordModal={setOpenChangePassWordModal}/>}

          </div>

        </div>

      </div>

      </div>

    </div>
  )
}

export default Profile;
