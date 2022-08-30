import React, { useState } from "react";
import "./Profile.css";
import authService from "../../utils/auth.service";

export default function Profile() {
  const [username, setUserName] = useState("");

  return (
    <div className='profile-page-wrapper'>

      <form>

        <div className='profile-form'>

          <div className='profile-user-image'>
            <img src='/' alt='' />
            
            <button className='upload-image-file'>
              <i className="fas fa-camera"></i>
              <input type="file" />
            </button>
          </div>

          <div className='profile-user-name'>
            <span>
              Mayonnaise178 
            </span>
          </div>

          <input className="authInput" placeholder="User name..." type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username} />

          

        </div>

      </form>

    </div>
  )
}
