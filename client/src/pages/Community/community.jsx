import React,{ useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Index";
import ServerList from "../../components/ServerList/Index";
import authService from "../../utils/auth.service";
import OtherFunctions from "../../components/OtherFunctions/Index";
import ChatBox from "../../components/ChatBox/Index";
import "./Community.css";


export default function Community() {

  return (

      <div className="app-wrapper">

        <ServerList />
        
        <Sidebar />

        <ChatBox />

        <OtherFunctions />
        
      </div>   
      
  );
}

