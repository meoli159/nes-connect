import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityListSuccess } from "../../redux/communitySlice";
import { createAxios } from "../../api/createInstance";
import chatService from "../../api/communityService";
import {selectCommunity} from "../../redux/messageSlice"
import "./style.css";
import { useEffect } from "react";

export function ServerChatRoom() {
  // const listRoom = [
  //   { id: 1, roomName: "Dragon Ball Ball Ball Ball" },
  //   { id: 2, roomName: "Naruto" },
  //   { id: 3, roomName: "Naruto" },
  //   { id: 4, roomName: "Naruto" },
  //   { id: 5, roomName: "Naruto" },
  //   { id: 6, roomName: "Naruto" },
  //   { id: 7, roomName: "Naruto" },
  //   { id: 8, roomName: "Naruto" },
  //   { id: 9, roomName: "Naruto" },
  //   { id: 10, roomName: "Naruto" },
  //   { id: 11, roomName: "Naruto" },
  //   { id: 12, roomName: "Naruto" },
  //   { id: 13, roomName: "Naruto" },
  //   { id: 14, roomName: "Naruto" },
  //   { id: 15, roomName: "Naruto" },
  //   { id: 16, roomName: "Naruto" },
  //   { id: 17, roomName: "Naruto" },
  //   { id: 18, roomName: "Naruto" },
  //   { id: 19, roomName: "Naruto" },
  //   { id: 20, roomName: "Naruto" },
  // ];
  const user = useSelector((state) => state.auth.login?.currentUser);
  const communityList = useSelector((state) => state.communities?.communityList);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, getCommunityListSuccess);
  const handleSelectChat = (community) => {
    dispatch(selectCommunity(community));
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      chatService.getCommunityList(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);
  return (
    <div>
      <div>
        {communityList?.map((community) => {
          return (
            <div
              
              className="server-chat-room-wrapper"
              key={community._id}
              onClick={()=>handleSelectChat(community) }
            >
              <div className="server-chat-room-image">
                <img src="" alt="" />
              </div>

              <div className="server-chat-room-name">
                <span>{community.groupName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServerChatRoom;
