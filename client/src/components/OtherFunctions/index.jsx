import { useSelector } from "react-redux";
import React, { useState } from "react";
import MemberList from "../MemberList/";
import "./style.css";
import EditGroupNameModal from "../Modal/EditGroupNameModal";
import AddPeopleModal from "../Modal/AddPeopleModal";
import LeaveGroupChatModal from "../Modal/LeaveGroupChatModal";
import { FaPen, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

function OtherContent() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const currentCommunity = useSelector((state) => state.messages?.currentCommunity);
  const currentCommunityButton = useSelector((state)=> state.messages.currentCommunity?.communityName);
  return (
    <div className="other-content-wrapper">
      <div className="other-content-container-top">
        <div className="right-server-chat-room-name-wrapper-2">

          <div className="server-chat-box-name-2">
            <span>{currentCommunity?.communityName}</span>
          </div>

          {currentCommunityButton ? (
          <button className="edit-chat-room-name" onClick={() => {setOpenEditModal(true)}}>
            <FaPen />
          </button>
          
          ) : (
        
            <div className="edit-chat-room-name-display-wrapper">
                <span>
                  Welcome back, Loser!
                </span>        
            </div>

          ) }
           
          {openEditModal && <EditGroupNameModal closeEditModal={setOpenEditModal}/>}
           
        </div>
      </div>

      <div className="separator5" />

      <div className="other-content-preview">
        
          <div className='add-member-to-chat'>

          {currentCommunityButton ? (
            <button className='add-member-button' onClick={() => {setOpenAddModal(true)}}>
              <FaUserPlus />
            </button>
            ) : (
              <div className="add-member-button-display-wrapper">
                <div className="add-member-button-display">
                </div>
              </div>
            )}

            {openAddModal && <AddPeopleModal closeAddModal={setOpenAddModal}/>}

          </div>

          <div className='leave-chat'>

          {currentCommunityButton ? (
            <button className='leave-chat-button' onClick={() => {setOpenLeaveModal(true)}}>
              <FaSignOutAlt />
            </button>
            ) : (
              <div className="leave-chat-button-display-wrapper">
                <div className="leave-chat-button-display">
                </div>
              </div>
            )}

            {openLeaveModal && <LeaveGroupChatModal closeLeaveModal={setOpenLeaveModal}/>}

          </div>
            
      </div>

        {currentCommunityButton ? (
          <div className="separator6" />
        ) : (
          <>  
          </>
        )} 
        
        
        <div className="people-in-chat-text">
          <span>
            Active friends
          </span>
        </div>
        
      <div className="current-people-in-chat-list">
        <MemberList />
      </div>
    </div>
  );
}

export default OtherContent;
