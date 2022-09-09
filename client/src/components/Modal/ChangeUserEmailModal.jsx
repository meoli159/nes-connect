import React from 'react';
import "./ChangeUserEmailModal.css";

function ChangeUserEmailModal( {closeChangeUserEmailModal} ) {
  return (
    <div className='change-user-email-background'>

      <form className='change-user-email-container'>
        <div className='title'>
          <p>Change Your Email</p>
        </div>

        <div className='body'>

          <div className='change-user-email-description'>
            <p>Enter a new email.</p>
          </div>

          <div className='change-user-email-title'>
            <p>Email</p>
          </div>

         <input
            className="change-user-email"
            placeholder="New email..."
            type="text"
          />

        </div>

        <div className='footer'>
          <button className='cancel-change-user-email-modal' onClick={() => closeChangeUserEmailModal(false)}>Cancel</button>
          <button className='continue-change-user-email-modal'>Continue</button>
        </div>
      </form>

    </div>
  )
}

export default ChangeUserEmailModal;