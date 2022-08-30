import React from "react";
import "./style.css";

export function ServerAddButton() {
     
        return (

                <div className="server-add-room">

                    <div className="server-add-text">
                       <span>Chat</span>
                    </div>

                <button className="server-create-room-button">
                  <i className='fas fa-edit'></i>
                </button>

                </div>
           
        )
    }


export default ServerAddButton;
