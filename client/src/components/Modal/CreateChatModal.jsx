import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import communityService from '../../api/communityService';
import "./CreateChatModal.css";

function CreateChatModal({ closeModal }) {
  const user = useSelector((state)=> state.auth.login?.currentUser);
  const [communityName,setCommunityName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = (e)=>{
    e.preventDefault()
    closeModal(false)
  }

  const handleSubmitCreateCommunity = (e)=>{
    e.preventDefault();
    const community = {
      communityName,
      user:user,
    }

    communityService.createCommunity(community,user?.accessToken,dispatch,navigate)
    handleCloseModal(e)
  }
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

              <div className='create-chat-room-name-wrapper'> 

                <button className='create-group-chat-image'>
                  <i className="fas fa-camera"></i>
                  <input type="file" />
                </button>

                <div className='group-chat-title'>
                  <p>Group chat name</p>
                </div>

                <input
                  className="create-chat-room-name"
                  value={communityName}
                  onChange={(e)=>setCommunityName(e.target.value)}
                  placeholder="Group chat name..."
                  type="text"
                />
              </div>      

            </div>
            <div className='footer'>
                <button className='cancel-create-group-modal' onClick={handleCloseModal}>Cancel</button>
                <button className='continue-create-group-modal'onClick={handleSubmitCreateCommunity}>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default CreateChatModal;