import { useSelector } from "react-redux";
import React from "react";
import "./style.css";
import { FaBiohazard } from "react-icons/fa";

function MemberList() {
  const user = useSelector((state) => state.auth?.currentUser);
  const selectedCommunity = useSelector((state) => state.messages?.currentCommunity);
  const currentCommunityMember = selectedCommunity?.users;
  const currentCommunityAdmin = selectedCommunity?.communityAdmin;
  const currentCommunity = selectedCommunity.communityName;

  const picture = user.pic;

  return (
    <div>
      <div>
        {currentCommunity ? (
          <div>
            {currentCommunityMember?.map((member) => (
              <div className="member-in-chat-wrapper" key={member._id}>
                <div className="member-image img">
                  <img src={picture} alt="" />
                  <span className="online-icon"></span>
                </div>

                <div className="member-name-wrapper">
                  <span className="member-name">{member.username}</span>
                  {member._id === currentCommunityAdmin._id && (
                    <div className="host-name-icon">
                      <FaBiohazard />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
}

export default MemberList;
