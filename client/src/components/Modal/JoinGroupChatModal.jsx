import React from 'react';
import "./JoinGroupChatModal.css";

function JoinGroupChatModal({ closeJoinModal }) {
  return (
    <div className='modal-join-background'>

    <form className='modal-join-container'>

        <div className='join-modal-title'>
            <p>Join Group Chat</p>
        </div>
        
        <div className='join-modal-body'>

          <div className='join-description'>
            <p>Join a group chat!</p>
          </div>

          <div className='join-title'>
            <p>Where would you like to go?</p>
          </div>

          <div className='join-group-input-wrapper'> 
            <input
              className="join-group"
              placeholder="Enter group chat ID..."
              type="text"
            />
          </div>     

        </div>

        <div className='join-modal-footer'>
            <button className='cancel-join-group-modal' onClick={() => closeJoinModal(false)}>Cancel</button>
            <button className='continue-join-group-modal'>Join</button>
        </div>

    </form>

  </div>
 
  )
}

export default JoinGroupChatModal;