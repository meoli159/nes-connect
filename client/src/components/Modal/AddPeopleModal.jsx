import React, { useState, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { communityUserAdd } from "../../api/communityService";
import { selectCommunity } from "../../redux/message/messageSlice";
import { SocketContext } from "../../utils/context/SocketContext";

import "./AddPeopleModal.css";

function AddPeopleModal({ closeAddModal }) {
  const socket = useContext(SocketContext);

  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const [addUser, setAddUser] = useState("");

  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    e.preventDefault();
    closeAddModal(false);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    communityUserAdd(currentCommunity?._id, { email: addUser }, socket).then((res) => {
        socket.emit("onCommunity", res);
      }
    );
    handleCloseModal(e);
  };

  return (
    <div className="modal-add-background">
      <form className="modal-add-container">
        <div className="add-modal-title ">
          <p>Invite Friends</p>
        </div>

        <div className="add-modal-body">
          <div className="modal-add-wrapper">
            <div className="add-description">
              <p>Invite friends to your group chat!</p>
            </div>

            <div className="add-title">
              <p>Search</p>
            </div>

            <div className="add-people-input-wrapper">
              <input
                className="add-people-input "
                placeholder="Invite your friends..."
                type="text"
                onChange={(e) => setAddUser(e.target.value)}
                value={addUser}
              />
            </div>
          </div>
        </div>

        <div className="add-modal-footer">
          <button
            className="cancel-add-people-modal"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button className="continue-add-people-modal" onClick={handleAddUser}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPeopleModal;
