import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export function ServerLogout() {
     
        return (
            <div>

            <div>
                <button className="server-logout">
                    <Link to='/'>
                       <i className="fas fa-sign-out-alt fa-2x"></i>
                    </Link>
                </button>
            </div>

            </div>
        )
    }


export default ServerLogout;
