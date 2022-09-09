import React from 'react';
import "./LeaveGroupChatModal.css";

function LeaveGroupChatModal({ closeLeaveModal }) {
  return (
    <div className='modal-leave-background'>
    <form className='modal-leave-container'>
        <div className='title'>
            <p>Leave Chat</p>
            <i className="fas fa-exclamation"></i>
        </div>
        <div className='body'>

          <div className='leave-description'>   
            <p>Are you sure you want to leave this group chat? You won't be ale to rejoin this group chat unless you are re-invited.</p>
          </div>  

        </div>
        <div className='footer'>
            <button className='cancel-leave-chat-modal' onClick={() => closeLeaveModal(false)}>Cancel</button>
            <button className='continue-leave-chat-modal'>Leave</button>
        </div>
    </form>
</div>
  )
}

export default LeaveGroupChatModal;