import React from 'react';
import "./JoinGroupChatModal.css";

function JoinGroupChatModal({ closeJoinModal }) {

  const handleCloseModal = (e) => {
    e.preventDefault();
    closeJoinModal(false);
  };

  return (
    <div className='modal-join-background'>

    <form className='modal-join-container'>
      <div className='join-modal-title'>
        <p>Join Group Chat</p>
      </div>

      <div className='join-modal-body'>

        <div className='join-group-chat-wrapper'>

          <div className='join-description'>
            <p>Where would you like to go?</p>
          </div>

          <div className='join-title'>
            <p>Group Chat ID</p>
          </div>

          <div className='join-group-input-wrapper'>
            <input
              className="join-group-input"
              placeholder="Enter Group Chat ID..."
              type="text"
            />
          </div>

        </div>

      </div>

      <div className='join-modal-footer'>
        <button className='cancel-join-group-modal ' onClick={handleCloseModal}>Cancel</button>
        <button className='continue-join-group-modal'>Join</button>
      </div>
    </form>

  </div>
 
  )
}

export default JoinGroupChatModal;