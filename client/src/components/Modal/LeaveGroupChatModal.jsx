import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeUserFromCommunity,deleteCommunity} from "../../api/communityService"
import { deleteCommunitySuccess } from "../../redux/community/communitySlice";
import { selectCommunity } from "../../redux/message/messageSlice";
import "./LeaveGroupChatModal.css";

function LeaveGroupChatModal({ closeLeaveModal }) {
  const communityAdmin = useSelector((state) => state.messages.currentCommunity?.communityAdmin);
  const currentCommunity = useSelector((state) => state.messages?.currentCommunity);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch()

  const handleCloseModal = (e)=>{
    e.preventDefault();
    closeLeaveModal(false)
  }

  const handleDeleteCommunity = (e)=>{
    e.preventDefault();
    deleteCommunity(currentCommunity?._id).then((res)=>{
      dispatch(deleteCommunitySuccess(res))
      dispatch(selectCommunity(res._id))
    })
    handleCloseModal(e)
  }

  const handleLeaveCommunity = (e)=>{
    e.preventDefault();
    removeUserFromCommunity(currentCommunity?._id,user._id)
    
    handleCloseModal(e)
  }
  return (
    <div className="modal-leave-background">
      {communityAdmin._id === user._id ? (
        <form className="modal-leave-container">
          <div className="title">
            <p>Delete Chat</p>
          </div>
          <div className="body">
            <div className="leave-chat-wrapper">
              <div className="leave-description">
                <p>
                  Are you sure you want to delete this group chat? You won't be
                  able to see this community again.
                </p>
              </div>
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
            <p>Leave Chat!</p>
          </div>
          <div className="body">
            <div className="leave-chat-wrapper">
              <div className="leave-description">
                <p>
                  Are you sure you want to leave this group chat? You won't be
                  able to rejoin this group chat unless you are re-invited.
                </p>
              </div>
            </div>
          </div>
          <div className="footer">
            <button className="cancel-leave-chat-modal"onClick={handleCloseModal}>Cancel</button>
            <button className="continue-leave-chat-modal"onClick={handleLeaveCommunity}>Leave</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LeaveGroupChatModal;
