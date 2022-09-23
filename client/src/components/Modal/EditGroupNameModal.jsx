import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import communityService from "../../api/communityService";
import "./EditGroupNameModal.css";

function EditGroupNameModal({ closeEditModal }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const [editCommunityName, setEditCommunityName] = useState("");
  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    e.preventDefault();
    closeEditModal(false);
  };

  const handleEditCommunity = (e) => {
    e.preventDefault();

    communityService.renameCommunity(
      currentCommunity?._id,
      { communityName: editCommunityName },
      user?.accessToken,
      dispatch
    );

    handleCloseModal(e);
  };

  const [file, setFile] = React.useState(null);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
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
                  <p>Feel free to give your group chat a new name. Have fun!</p>
                </div>

                <div className='edit-group-chat-preview-image-wrapper'>
                  <div className='edit-image-preview-wrapper'>
                    <img className='edit-image-preview' 
                      src={file? URL.createObjectURL(file) : user?.pic} 
                      alt={file? file.name : user?.pic}
                    />
                  </div>

                  <div className='edit-group-chat-image-button-wrapper'>
                    <button className='edit-group-chat-image-button'>
                      <p>Upload Image</p>
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
                    placeholder="Edit Your Group Chat Name..."
                    type="text"
                  />
                </div>

              </div>      

            </div>
            <div className='modal-edit-footer'>
                <button className='cancel-edit-group-modal' onClick={handleCloseModal}>Cancel</button>
                <button className='continue-edit-group-modal' onClick={handleEditCommunity}>Edit</button>
            </div>
        </form>
    </div>
  );
}

export default EditGroupNameModal;
