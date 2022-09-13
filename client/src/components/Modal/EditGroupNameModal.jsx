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

  const [file, setFile] = React.useState(null);
    
  const fileHandler = (e) => {
      setFile(e.target.files[0])
  };

  return (
    <div className='modalEditBackground'>
        <form className='modalEditContainer'>
            <div className='modal-edit-title'>
              <p>Edit Your Group Chat</p>
            </div>

            <div className='modal-edit-body'>

              <div className='edit-chat-room-name-wrapper'> 

                <div className='edit-description'>
                  <p>Give your new group chat a name. You can always change it later. Have fun!</p>
                </div>

                <div className='edit-group-chat-preview-image-wrapper'>
                  <div className='edit-image-preview-wrapper'>
                    <img className='edit-image-preview' 
                      src={file? URL.createObjectURL(file) : null} 
                      alt={file? file.name : null}
                    />
                  </div>

                  <div className='edit-group-chat-image-button-wrapper'>
                    <button className='edit-group-chat-image-button'>
                      <input 
                        accept="image/*" 
                        type="file" 
                        onChange={fileHandler}
                      />
                    </button>
                  </div> 

                </div>

                <div className='group-chat-title'>
                  <p>Group chat name</p>
                </div>

                <div className='edit-chat-room-name-input-wrapper'>
                  <input
                    className="edit-chat-room-name-input"
                    value={editCommunityName}
                    onChange={(e)=>setEditCommunityName(e.target.value)}
                    placeholder="Group chat name..."
                    type="text"
                  />
                </div>

              </div>      

            </div>
            <div className='modal-edit-footer'>
              <button className='cancel-edit-group-modal' onClick={handleCloseModal}>Cancel</button>
              <button className='continue-edit-group-modal' onClick={handleEditCommunity}>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default EditGroupNameModal;