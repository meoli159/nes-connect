import React, { useState } from "react";
import "./style.css";
import Modal from "../Modal/CreateChatModal";

export function ServerAddButton() {

  const [openModal, setOpenModal] = useState(false)
     
        return (

                <div className="server-add-room-wrapper">

                    <div className="server-add-text">
                       <span>Chat</span>
                    </div>

                <button className="server-create-room-button" onClick={() => {setOpenModal(true)}}>
                  <i className='fas fa-edit'></i>
                </button>

                {openModal && <Modal closeModal={setOpenModal}/>}

                </div>
           
        )
    }


export default ServerAddButton;
