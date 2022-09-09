import React from 'react';
import "./EditGroupNameModal.css";

function EditGroupNameModal({ closeEditModal }) {
  return (
    <div className='modalEditBackground'>
        <form className='modalEditContainer'>
            <div className='title'>
                <p>Update Group Chat</p>
            </div>
            <div className='body'>

              <div className='edit-description'>
                <p>Feel free to customize your group chat. Have fun!</p>
              </div>

              <button className='edit-group-chat-image'>
                <i className="fas fa-camera"></i>
                <input type="file" />
              </button>

              <div className='group-chat-title'>
                <p>Group chat name</p>
              </div>
                    
              <input
                 className="change-chat-room-name"
                 placeholder="Change your group chat name..."
                 type="text"
               />

            </div>
            <div className='footer'>
                <button className='cancel-edit-group-modal' onClick={() => closeEditModal(false)}>Cancel</button>
                <button className='continue-edit-group-modal'>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default EditGroupNameModal;