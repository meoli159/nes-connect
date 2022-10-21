import React from "react";
import "./style.css";
import { FaSpinner } from "react-icons/fa";

export function ServerLogo() {
     
        return (
            <div className="server-logo-wrapper">
 
                <button className="server-logo">
                    <div className="server-logo-text">
                        <span>
                            Nes 
                        </span>
                          <div className="spin-icon">
                          <FaSpinner 
                          className="fa-spin"
                          />
                          </div>
                    </div>        
                </button>
            
            </div>
        )
    }


export default ServerLogo;
