import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import communityService from "../../api/communityService"
import "./EditGroupNameModal.css";

function EditGroupNameModal({ closeEditModal }) {
  const user = useSelector((state)=> state.auth.login?.currentUser);
  const currentCommunity = useSelector((state)=> state.messages?.currentCommunity)
  const [editCommunityName,setEditCommunityName]=useState('')
  const dispatch = useDispatch();

  const handleCloseModal = (e)=>{
    e.preventDefault()
    closeEditModal(false)
  }

  const handleEditCommunity = (e)=>{
      e.preventDefault();
      const community = {
       communityId: currentCommunity?._id,
       communityName: editCommunityName, 
      }
      communityService.renameCommunity(community,user?.accessToken,dispatch)
      handleCloseModal(e)
  }
  return (
    <div className='modalEditBackground'>
        <form className='modalEditContainer' >
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
                 value={editCommunityName}
                 onChange={(e)=>setEditCommunityName(e.target.value)}
                 placeholder="Change your group chat name..."
                 type="text"
               />

            </div>
            <div className='footer'>
                <button className='cancel-edit-group-modal' onClick={handleCloseModal}>Cancel</button>
                <button className='continue-edit-group-modal'onClick={handleEditCommunity}>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default EditGroupNameModal;