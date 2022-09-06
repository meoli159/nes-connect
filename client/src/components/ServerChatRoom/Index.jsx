import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCommunity } from "../../redux/messageSlice";
import { createAxios } from "../../api/createInstance";
import chatService from "../../api/communityService";
import "./style.css";
import { loginSuccess } from "../../redux/authSlice";

export default function ServerChatRoom() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const communityList = useSelector(
    (state) => state.communities?.communityList
  );

  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleSelectChat = (community) => {
    dispatch(selectCommunity(community));
  };
  useEffect(() => {
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
              onClick={() => handleSelectChat(community)}
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
