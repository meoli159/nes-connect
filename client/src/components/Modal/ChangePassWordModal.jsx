import React, { useState } from 'react';
import "./ChangePassWordModal.css";
import { FaEyeSlash, FaEye } from 'react-icons/fa'; 

function ChangePassWordModal({ closeChangePassWordModal }) {

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [state, setState] = useState(false);

  const handleShowPassword = () => {
   setState(prevState => !prevState)
  };

  return (
    <div className='change-user-password-background'>

      <form className='change-user-password-container'>
        <div className='title'>
          <p>Change Your Password</p>
        </div>

        <div className='body'>

          <div className='change-user-password-wrapper'>

          <div className='change-user-password-description'>
            <p>Enter a new password.</p>
          </div>

          <div className='change-user-password-title'>
            <p>New Password</p>
          </div>

          <div className='change-user-password-input-wrapper'>
            <input 
              className='change-user-password-input'
              type={state? "text" : "password"} 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='New password...'
            />

            <span className='show-button' onClick={handleShowPassword}>
              {state? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>
          
          <div className='confirm-new-password-title'>
            <p>Confirm New Password</p>
          </div>
          
          <div className='confirm-new-password-input-wrapper'>
            <input
              className="confirm-new-password-input"
              placeholder="Confirm new password..."
              type={state? "text" : "password"} 
              onChange={(e) => setCPassword(e.target.value)}
              value={cPassword}
            />

            <span className='show-button' onClick={handleShowPassword}>
              {state? <FaEyeSlash /> : <FaEye />}
            </span>
            
          </div>

          </div>

        </div>

        <div className='footer'>
          <button className='cancel-change-user-password-modal' onClick={() => closeChangePassWordModal(false)}>Cancel</button>
          <button className='continue-change-user-password-modal'>Change</button>
        </div>
      </form>

    </div>
  )
}

export default ChangePassWordModal;