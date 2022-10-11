import React from 'react';
import "./ChangeUserNameModal.css";

function ChangeUserNameModal({ closeChangeUserNameModal }) {

  const handleCloseModal = (e) => {
    e.preventDefault();
    closeChangeUserNameModal(false);
  };

  return (
    <div className='change-user-name-background'>

    <form className='change-user-name-container'>
      <div className='title'>
        <p>Change Your Username</p>
      </div>

      <div className='body'>

        <div className='change-user-name-wrapper'>

          <div className='change-user-name-description'>
            <p>Enter a new username.</p>
          </div>

          <div className='change-user-name-title'>
            <p>Username</p>
          </div>

          <div className='change-user-name-input-wrapper'>
            <input
              className="change-user-name-input"
              placeholder="New username..."
              type="text"
            />
          </div>

        </div>

      </div>

      <div className='footer'>
        <button className='cancel-change-user-name-modal' onClick={handleCloseModal}>Cancel</button>
        <button className='continue-change-user-name-modal'>Change</button>
      </div>
    </form>

  </div>
  )
}

export default ChangeUserNameModal;