import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCommunity } from "../../redux/messageSlice";
import chatService from "../../api/communityService";
import "./style.css";

export default function ServerChatRoom() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const communityList = useSelector(
    (state) => state.communities?.communityList
  );
  const dispatch = useDispatch();

  const handleSelectChat = (community) => {
    dispatch(selectCommunity(community));
  };
  useEffect(() => {
    if (user?.accessToken) {
      chatService.getCommunityList(user?.accessToken, dispatch);
    }
  }, []);
  return (
    <div>
      <div>
        {communityList?.map((el, index) => {
          return (
            <div
              className="server-chat-room-wrapper"
              key={index}
              onClick={() => handleSelectChat(el)}
            >
              <div className="server-chat-room-image">
                <img src="" alt="" />
              </div>

              <div className="server-chat-room-name">
                <span>{el.communityName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
