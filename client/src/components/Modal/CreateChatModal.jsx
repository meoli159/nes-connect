import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommunityThunk } from "../../redux/community/communityThunk";
import "./CreateChatModal.css";

function CreateChatModal({ closeModal }) {
  const user = useSelector((state) => state.auth.currentUser);
  const [communityName, setCommunityName] = useState("");

  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    e.preventDefault();
    closeModal(false);
  };

  const handleSubmitCreateCommunity = (e) => {
    e.preventDefault();
    const community = {
      communityName,
      user: user,
    };

    dispatch(createCommunityThunk(community));
    handleCloseModal(e);
  };

  const [file, setFile] = React.useState(null);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="modalBackground">
      <form className="modalContainer">
        <div className="modal-create-title">
          <p>Create Your Group Chat</p>
        </div>

        <div className="modal-create-body">
          <div className="create-chat-room-name-wrapper">
            <div className="create-description">
              <p>
                Give your new group chat a name. You can always change it later!
              </p>
            </div>

            <div className="create-group-chat-preview-image-wrapper">
              <div className="create-image-preview-wrapper">
                <img
                  className="create-image-preview"
                  src={file ? URL.createObjectURL(file) : null}
                  alt={file ? file.name : null}
                />
              </div>

              <div className="create-group-chat-image-button-wrapper">
                <button className="create-group-chat-image-button">
                  <p>Upload Image</p>
                  <input accept="image/*" type="file" onChange={fileHandler} />
                </button>
              </div>
            </div>

            <div className="group-chat-title">
              <p>Group chat name</p>
            </div>

            <div className="create-chat-room-name-input-wrapper">
              <input
                className="create-chat-room-name-input"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Group Chat Name..."
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="modal-create-footer">
          <button
            className="cancel-create-group-modal"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="continue-create-group-modal"
            onClick={handleSubmitCreateCommunity}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChatModal;
