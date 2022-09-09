import React, { useState } from 'react';
import "./ChangePassWordModal.css";

function ChangePassWordModal({ closeChangePassWordModal }) {

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [type, setType] = useState('password'); 
  const [click, setClick] = useState(false);
  const handleShowPassword = () => {
    if(type === 'password'){    
        setType('text');
        setClick(!click);
    }
    else{   
        setType('password');
        setClick(!click);
    }
  };

  return (
    <div className='change-user-password-background'>

      <form className='change-user-password-container'>
        <div className='title'>
          <p>Change Your Password</p>
        </div>

        <div className='body'>

          <div className='change-user-password-description'>
            <p>Enter a new password.</p>
          </div>

          <div className='change-user-password-title'>
            <p>New Password</p>
          </div>

          <input 
            className='change-user-password'
            type={type} 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='New password...'
          />

          <span className='show-button' onClick={handleShowPassword}>
            <i className={click? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
          
          <div className='confirm-new-password-title'>
            <p>Confirm New Password</p>
          </div>

          <input
            className="confirm-new-password"
            placeholder="Confirm new password..."
            type={type}
            onChange={(e) => setCPassword(e.target.value)}
            value={cPassword}
          />

          <span className='show-button' onClick={handleShowPassword}>
            <i className={click? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>

        </div>

        <div className='footer'>
          <button className='cancel-change-user-password-modal' onClick={() => closeChangePassWordModal(false)}>Cancel</button>
          <button className='continue-change-user-password-modal'>Continue</button>
        </div>
      </form>

    </div>
  )
}

export default ChangePassWordModal;