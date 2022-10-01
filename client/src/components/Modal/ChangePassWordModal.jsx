import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../api/authService";
import "./ChangePassWordModal.css";

function ChangePassWordModal({ closeChangePassWordModal }) {
  const user = useSelector((state) => state.auth?.currentUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const dispatch = useDispatch();
  const handleCloseModal = (e) => {
    e.preventDefault();
    closeChangePassWordModal(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return console.error("Confirm password not matched");
    } else {
      authService.updateUser(
        { oldPassword: oldPassword, password: password },
        user?.accessToken,
        dispatch
      );
      
    }
    handleCloseModal(e);
  };
  return (
    <div className="change-user-password-background">
      <form className="change-user-password-container" onSubmit={handleUpdatePassword}>
        <div className="title">
          <p>Update Your Password</p>
        </div>

        <div className="body">
          <div className="change-user-password-wrapper">
            <div className="change-user-password-description">
              <p>Enter your current password and a new password.</p>
            </div>

            <div className="user-current-password-title">
              <p>Current Password</p>
            </div>

            <div className="user-current-password-input-wrapper">
              <input
                className="user-current-password-input"
                type="password"
                placeholder="Current password..."
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
              />
            </div>

            <div className="change-user-password-title">
              <p>New Password</p>
            </div>

            <div className="change-user-password-input-wrapper">
              <input
                className="change-user-password-input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="New password..."
              />
            </div>

            <div className="confirm-new-password-title">
              <p>Confirm New Password</p>
            </div>

            <div className="confirm-new-password-input-wrapper">
              <input
                className="confirm-new-password-input"
                placeholder="Confirm new password..."
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>
        </div>

        <div className="footer">
          <button
            className="cancel-change-user-password-modal"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button className="continue-change-user-password-modal" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassWordModal;
