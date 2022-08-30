import React from "react";
import Sidebar from "../../components/Sidebar/Index";
import OtherFunctions from "../../components/OtherFunctions/Index";
import ChatBox from "../../components/ChatBox/Index";
import "./Community.css";


export default function Community() {

  return (

      <div className="app-wrapper">

        
        <Sidebar />

        <ChatBox />

        <OtherFunctions />
        
      </div>   
      
  );
}

