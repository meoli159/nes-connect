import React from "react";
import { Link } from "react-router-dom";
import Home from "../../pages/Home/Home";
import "./style.css";

export function ServerLogo() {
     
        return (
            <div>

            <div>
                <button className="server-logo">

                    <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>Nes</Link>
                        
                </button>
            </div>

            </div>
        )
    }


export default ServerLogo;
