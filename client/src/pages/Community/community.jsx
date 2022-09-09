import React from "react";
import Sidebar from "../../components/Sidebar";
import OtherFunctions from "../../components/OtherFunctions";
import ChatBox from "../../components/ChatBox";
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

