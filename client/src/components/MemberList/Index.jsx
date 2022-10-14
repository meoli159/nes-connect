import { useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { OnlineCommunityMembers } from "./OnlineCommunityMembers";
import { OfflineCommunityMembers } from "./OfflineCommunityMembers";

function MemberList() {
  // const user = useSelector((state) => state.auth?.currentUser);
  const selectedCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const communityId = selectedCommunity?._id;
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("getOnlineCommunityUsers", selectedCommunity);
    const interval = setInterval(() => {
      socket.emit("getOnlineCommunityUsers", selectedCommunity);
    }, 5000);

    socket.on("onlineCommunityUsersReceived", (users) => {
      setOnlineUsers(users.onlineUsers);
    });

    return () => {
      clearInterval(interval);
      socket.off("onlineCommunityUsersReceived");
    };
  }, [communityId, selectedCommunity, socket]);

  return (
    <>
      <div className="member-list-wrapper">
        {selectedCommunity._id ? (
          <>
            <div className="online-user-text">
              <span>Online users</span>
            </div>
            <div className="online-user-list">
              <OnlineCommunityMembers
                communityMembers={onlineUsers}
                community={selectedCommunity}
              />
            </div>

            <div className="offline-user-text">
              <span>Offline users</span>
            </div>
            <div className="offline-user-list">
              <OfflineCommunityMembers
                onlineUsers={onlineUsers}
                community={selectedCommunity}
              />
            </div>
          </>
        ) : (
          <div className="no-user-display-wrapper">
            <div className="no-user-display-description-1">
              <span>Opps! No friends found...</span>
            </div>

            <div className="no-user-display-description-2">
              <span>
                Please join or create a group chat, we will show your active
                friends here.
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MemberList;
