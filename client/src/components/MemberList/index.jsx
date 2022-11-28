import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { OnlineCommunityMembers } from "./OnlineCommunityMembers";
import { OfflineCommunityMembers } from "./OfflineCommunityMembers";
import {
  setContextMenuLocation,
  setSelectedUser,
  toggleContextMenu,
} from "../../redux/communityMemberSidebarSlice";
import { ContextMenu } from "../ContextMenu";
function MemberList() {
  const communitySidebarState = useSelector((state) => state.communitySidebar);
  const selectedCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const communityAdmin = selectedCommunity?.communityAdmin
  const communityId = selectedCommunity?._id;
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEventListener = () => dispatch(toggleContextMenu(false));
    window.addEventListener("click", handleEventListener);
    window.addEventListener("resize", handleEventListener);
    return () => {
      window.removeEventListener("click", handleEventListener);
      window.removeEventListener("resize", handleEventListener);
    };
  }, [dispatch]);

  useEffect(() => {
    socket.emit("getOnlineCommunityUsers", selectedCommunity);
    const interval = setInterval(() => {
      socket.emit("getOnlineCommunityUsers", selectedCommunity);
    }, 2000);

    socket.on("onlineCommunityUsersReceived", (users) => {
      setOnlineUsers(users.onlineUsers);
    });

    return () => {
      clearInterval(interval);
      socket.off("onlineCommunityUsersReceived");
    };
  }, [communityId, selectedCommunity, socket]);

  const onUserContextMenu = (e, user) => {
    e.preventDefault();
    if(currentUser._id !== communityAdmin._id ) return;
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.clientX, y: e.clientY }));
    dispatch(setSelectedUser(user));
  };

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
                onUserContextMenu={onUserContextMenu}
                onClickUserHandle={setSelectedUser}
                communityMembers={onlineUsers}
                community={selectedCommunity}
              />
            </div>

            <div className="offline-user-text">
              <span>Offline users</span>
            </div>
            <div className="offline-user-list">
              <OfflineCommunityMembers
                onUserContextMenu={onUserContextMenu}
                onClickUserHandle={setSelectedUser}
                onlineUsers={onlineUsers}
                community={selectedCommunity}
              />
            </div>
            {communitySidebarState.showUserContextMenu && (
              <ContextMenu point={communitySidebarState.points} />
            )}
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
