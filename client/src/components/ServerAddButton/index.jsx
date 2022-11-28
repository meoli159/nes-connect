import React, { useState } from "react";
import "./style.css";
import Modal from "../Modal/CreateChatModal";
import { FaPlus } from "react-icons/fa";

export function ServerAddButton() {

  const [openModal, setOpenModal] = useState(false);
  //const [openJoinModal, setOpenJoinModal] = useState(false)
     
        return (

                <div className="server-add-room-wrapper">

                    <div className="server-add-text">
                      <span>
                        Chat
                      </span>
                    </div>

                    <button className="server-create-room-button" onClick={() => {setOpenModal(true)}}>
                      <FaPlus />
                    </button>

                    {openModal && <Modal closeModal={setOpenModal}/>}

                    {/* <button className="join-group-chat-button" onClick={() => {setOpenJoinModal(true)}}>
                      <FaSignInAlt />
                    </button>

                    {openJoinModal && <JoinGroupChatModal closeJoinModal={setOpenJoinModal}/>} */}

                </div>
           
        )
    }


export default ServerAddButton;
