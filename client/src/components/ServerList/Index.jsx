import React from "react";
import "./style.css";
import ServerLogo from "../ServerLogo/Index";
import ServerLogout from "../ServerLogout/Index";
import ServerAddButton from "../ServerAddButton/Index";


export default function ServerList() {
    
        return (
            <div className="server-list-container">
                <ServerLogo />
                <div className="separator1" />
                <ServerAddButton />
                <div className="separator2" />
                <ServerLogout/>
            </div>
        )
}