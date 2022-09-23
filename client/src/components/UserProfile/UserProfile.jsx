import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./UserProfile.css";
import ChangeUserNameModal from "../../components/Modal/ChangeUserNameModal";
import ChangePassWordModal from "../../components/Modal/ChangePassWordModal";
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';


export default function UserProfile() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const email = user.email;
  
 
  const [openChangeUserNameModal, setOpenChangeUserNameModal] = useState(false);
  const [openChangePassWordModal, setOpenChangePassWordModal] = useState(false);

  const [file, setFile] = React.useState(null);
    
  const fileHandler = (e) => {
      setFile(e.target.files[0])
  };

  return (
    <div className="profile-form">

    <div className='back-to-chat-box-wrapper'>
      <Link to='/app' style={{ color: '#FFF' }}>
        <div className='back-to-chat-box-button'> 
          <FaTimes className='back-to-chat-box'/>   
        </div>  
      </Link>
    </div>

    <div className="profile-form-wrapper">

      <div className='profile-form-content'>

        {/* User image */}

        <div>
          <div className='profile-user-image img'>
            <img 
            src={file? URL.createObjectURL(file) : user?.pic} 
            alt={file? file.name : user?.pic}
            />
          
            <div className='upload-image-file-wrapper'>
              <button className='upload-image-file-button'>  
                <p>Upload Image</p>
                
                <input 
                  accept="image/*" 
                  type="file" 
                  onChange={fileHandler}
                />
              </button> 
            </div>

          </div>
        </div>  

        {/* User name */}

        <div className='profile-user-name-wrapper'>
          <span className='profile-user-name'>
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
              {email}
            </span>
          </div>
        </div>

        {/* Change user password */}

        <div className="user-password-title-wrapper">
          <div className="user-password-title">
            <span className="user-password">
              Password update
            </span>
            
          </div>

          <button className="change-user-password-button" onClick={() => {setOpenChangePassWordModal(true)}}>
            Update
          </button>

          {openChangePassWordModal && <ChangePassWordModal closeChangePassWordModal={setOpenChangePassWordModal}/>}

        </div>

      </div>

    </div>  

  </div>

  )
}