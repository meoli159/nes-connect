import React, { useState } from 'react';
import "./ChangePassWordModal.css";

function ChangePassWordModal({ closeChangePassWordModal }) {

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [crPassword, setCRPassword] = useState("");

  return (
    <div className='change-user-password-background'>

      <form className='change-user-password-container'>
        <div className='title'>
          <p>Update Your Password</p>
        </div>

        <div className='body'>

          <div className='change-user-password-wrapper'>

          <div className='change-user-password-description'>
            <p>Enter your current password and a new password.</p>
          </div>
          
          <div className='user-current-password-title'>
            <p>Current Password</p>
          </div>

          <div className='user-current-password-input-wrapper'>
            <input 
              className='user-current-password-input'
              type="password"
              onChange={(e) => setCRPassword(e.target.value)}
              value={crPassword}
              placeholder='Current password...'
            />
          </div>

          <div className='change-user-password-title'>
            <p>New Password</p>
          </div>

          <div className='change-user-password-input-wrapper'>
            <input 
              className='change-user-password-input'
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='New password...'
            />
          </div>
          
          <div className='confirm-new-password-title'>
            <p>Confirm New Password</p>
          </div>
          
          <div className='confirm-new-password-input-wrapper'>
            <input
              className="confirm-new-password-input"
              placeholder="Confirm new password..."
              type="password" 
              onChange={(e) => setCPassword(e.target.value)}
              value={cPassword}
            />
          </div>

          </div>

        </div>

        <div className='footer'>
          <button className='cancel-change-user-password-modal' onClick={() => closeChangePassWordModal(false)}>Cancel</button>
          <button className='continue-change-user-password-modal'>Update</button>
        </div>
      </form>

    </div>
  )
}

export default ChangePassWordModal;