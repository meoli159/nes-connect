import React from "react";
import { useDispatch, useSelector } from "react-redux";
import communityService from "../../api/communityService"
import "./LeaveGroupChatModal.css";

function LeaveGroupChatModal({ closeLeaveModal }) {
  const communityAdmin = useSelector((state) => state.messages.currentCommunity?.communityAdmin);
  const currentCommunity = useSelector((state) => state.messages?.currentCommunity);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch()

  const handleCloseModal = (e)=>{
    e.preventDefault();
    closeLeaveModal(false)
  }
  const handleDeleteCommunity = (e)=>{
    e.preventDefault();
    communityService.deleteCommunity(currentCommunity?._id,user?.accessToken,dispatch)
    handleCloseModal(e)
  }

  return (
    <div className="modal-leave-background">
      {communityAdmin._id === user._id ? (
        <form className="modal-leave-container">
          <div className="title">
            <p>Delete Chat!</p>
          </div>
          <div className="body">
            <div className="leave-description">
              <p>
                Are you sure you want to delete this group chat? You won't be
                able to see this community again.
              </p>
            </div>
          </div>
          <div className="footer">
            <button
              className="cancel-leave-chat-modal"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button className="continue-leave-chat-modal" onClick={handleDeleteCommunity}>Delete</button>
          </div>
        </form>
      ) : (
        <form className="modal-leave-container">
          <div className="title">
            <p>Leave Chat</p>
            <i className="fas fa-exclamation"></i>
          </div>
          <div className="body">
            <div className="leave-description">
              <p>
                Are you sure you want to leave this group chat? You won't be
                able to rejoin this group chat unless you are re-invited.
              </p>
            </div>
          </div>
          <div className="footer">
            <button
              className="cancel-leave-chat-modal"
              onClick={(e) => closeLeaveModal(e.preventDefault(false))}
            >
              Cancel
            </button>
            <button className="continue-leave-chat-modal">Leave</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LeaveGroupChatModal;
