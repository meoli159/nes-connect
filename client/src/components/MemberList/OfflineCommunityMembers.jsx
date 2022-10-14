import "./style.css";
import { FaBiohazard } from "react-icons/fa";
import React from "react";

export const OfflineCommunityMembers = ({
  onlineUsers,
  community,
  onUserContextMenu,
  onClickUserHandle,
}) => {
  return (
    <div>
      {community?.users
        .filter(
          (user) =>
            !onlineUsers?.find((onlineUser) => onlineUser?._id === user?._id)
        )
        .map((member) => (
          <div
            className="member-in-chat-wrapper-off"
            onContextMenu={(e) => onUserContextMenu(e, member)}
            onClick={() => {onClickUserHandle(member);}}
            key={member._id}
          >
            <div className="member-image img">
              <img src={member.pic} alt="" />
            </div>

            <div className="member-name-wrapper">
              <span className="member-name">{member.username}</span>
              {member._id === community.communityAdmin._id && (
                <div className="host-name-icon">
                  <FaBiohazard />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
