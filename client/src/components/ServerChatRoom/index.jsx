import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCommunity } from "../../redux/message/messageSlice";
import "./style.css";
import { fetchCommunityThunk } from "../../redux/community/communityThunk";
import { SocketContext } from "../../utils/context/SocketContext";
export default function ServerChatRoom() {
  const communityList = useSelector((state) => state.communities?.communities);
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();

  const handleSelectChat = (community) => {
    dispatch(selectCommunity(community));
  };

  useEffect(() => {
    dispatch(fetchCommunityThunk());
  }, [dispatch, socket]);
 
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
              <>
                <div className="server-chat-room-image img">
                  <img src={community.pic} alt="" />
                </div>

                <div className="server-chat-room-name">
                  <span>{community.communityName}</span>
                </div>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}
