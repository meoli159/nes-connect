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
              <div className="server-chat-room-image img">
                <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg?fbclid=IwAR0gLORQDSkOYlg89GKCW0FboJc6Zv2CpboFkVlsg0YSqv2B1PsN4w3jSzA" 
                alt="" 
                />
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
