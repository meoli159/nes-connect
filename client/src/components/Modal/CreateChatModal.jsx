import React from 'react';
import "./CreateChatModal.css";

function CreateChatModal({ closeModal }) {
  return (
    <div className='modalBackground'>
        <form className='modalContainer'>
            <div className='title'>
              <p>Create Your Group Chat</p>
            </div>

            <div className='body'>

            <div className='create-description'>
              <p>Give your new group chat a name. You can always change it later. Have fun!</p>
            </div>

            <button className='upload-group-chat-image'>
              <i className="fas fa-camera"></i>
              <input type="file" />
            </button>

            <div className='group-chat-title'>
              <p>Group chat name</p>
            </div>
                    
              <input
                 className="create-chat-room-name"
                 placeholder="Group chat name..."
                 type="text"
               />

            </div>
            <div className='footer'>
                <button className='cancel-create-group-modal' onClick={() => closeModal(false)}>Cancel</button>
                <button className='continue-create-group-modal'>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default CreateChatModal;