import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../api/authService";
import "./ChangeUserNameModal.css";

function ChangeUserNameModal({ closeChangeUserNameModal }) {
  const user = useSelector((state) => state.auth?.currentUser);
  const [editUserName, setEditUserName] = useState("");

  const dispatch = useDispatch();
  const handleCloseModal = (e) => {
    e.preventDefault();
    closeChangeUserNameModal(false);
  };

  const handleUpdateUserName = async (e) => {
    e.preventDefault();
    authService.updateUser(
      { username: editUserName },
      user?.accessToken,
      dispatch
    );
    handleCloseModal(e);
  };
  return (
    <div className="change-user-name-background">
      <form className="change-user-name-container">
        <div className="title">
          <p>Change Your Username</p>
        </div>

        <div className="body">
          <div className="change-user-name-wrapper">
            <div className="change-user-name-description">
              <p>Enter a new username.</p>
            </div>

            <div className="change-user-name-title">
              <p>Username</p>
            </div>

            <div className="change-user-name-input-wrapper">
              <input
                className="change-user-name-input"
                placeholder="New username..."
                type="text"
                onChange={(e) => setEditUserName(e.target.value)}
                value={editUserName}
              />
            </div>
          </div>
        </div>

        <div className="footer">
          <button className="cancel-change-user-name-modal" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="continue-change-user-name-modal" onClick={handleUpdateUserName}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeUserNameModal;
