import React, { useState } from "react";
import MemberList from '../MemberList';
import "./style.css";
import EditGroupNameModal from "../Modal/EditGroupNameModal";
import AddPeopleModal from "../Modal/AddPeopleModal";
import LeaveGroupChatModal from "../Modal/LeaveGroupChatModal";

function OtherContent() {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  return (

    <div className='other-content-wrapper'>

        <div className='other-content-container-top'>

          <div className="right-server-chat-room-name-wrapper-2">

            <div className="server-chat-room-image-main-2">
              <img src='' alt='' />
            </div>

            <div className="server-chat-box-name-2">
              <span>Dragon Ball Ball Ball Ball Ball Ball Ball Ball Ball Ball Ball Ball</span> 
            </div>

            <button className='edit-chat-room-name' onClick={() => {setOpenEditModal(true)}}>
              <i className="fas fa-pen"></i>
            </button>

            {openEditModal && <EditGroupNameModal closeEditModal={setOpenEditModal}/>}

          </div>
            
        </div>

        <div className="separator5" />

        <div className='other-content-preview'>

          <div className='add-member-to-chat'>

            <button className='add-member-button' onClick={() => {setOpenAddModal(true)}}>
              <i className="fas fa-user-plus"></i>
            </button>

            {openAddModal && <AddPeopleModal closeAddModal={setOpenAddModal}/>}

          </div>

          <div className='leave-chat'>

            <button className='leave-chat-button' onClick={() => {setOpenLeaveModal(true)}}>
              <i className="fas fa-sign-out-alt"></i>
            </button>

            {openLeaveModal && <LeaveGroupChatModal closeLeaveModal={setOpenLeaveModal}/>}

          </div>
           
        </div>

        <div className="separator6" />

          <div className='people-in-chat-text'>
            <span>People in chat</span>
          </div>

          <div className='current-people-in-chat-list'>
            <MemberList />
          </div>
           
    </div>
  )
}

export default OtherContent;