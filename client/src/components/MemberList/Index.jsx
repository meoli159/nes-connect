import { useSelector } from "react-redux";
import React from "react";
import "./style.css";

function MemberList() {
  const currentCommunityMember = useSelector(
    (state) => state.messages.currentCommunity?.users
  );
  const currentCommunityAdmin = useSelector(
    (state) => state.messages.currentCommunity?.communityAdmin
  );

  return (
    <div>
      <div>
        {/* Group Admin display */}
        <div className="member-in-chat-wrapper">
          <div className="member-image">
            <img src="" alt="" />
          </div>

          <div className="member-name">
            <span>{currentCommunityAdmin?.username}</span>{" "}
            <i className="fas fa-crown" style={{ color: "#f3da35" }} />
          </div>
        </div>

        {/* Member display */}
        {currentCommunityMember?.map((member) => {
          return (
            <div className="member-in-chat-wrapper" key={member._id}>
              <div className="member-image">
                <img src="" alt="" />
              </div>

              <div className="member-name">
                <span>{member.username}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemberList;
