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

  const currentCommunity = useSelector(
    (state) => state.messages.currentCommunity?.communityName
  );

  return (
    <div>
      <div>
        {currentCommunity ? (
          <div>
            {/* Group Admin display */}

            <div className="member-in-chat-wrapper">
              <div className="member-image">
                <img
                  src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg?fbclid=IwAR06WJlATDqI74cupelGvlok1ZL65hmfOgooBq2d_j9lLb1NgH6WIyDFeCc"
                  alt=""
                />
              </div>

              <div className="member-name">
                <span>{currentCommunityAdmin?.username}</span>{" "}
                <i className="fas fa-toilet" style={{ color: "#f3da35" }} />
              </div>
            </div>

            {/* Member display */}
            {currentCommunityMember?.map((member) => {
              return (
                <div className="member-in-chat-wrapper" key={member._id}>
                  <div className="member-image img">
                    <img
                      src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg?fbclid=IwAR06WJlATDqI74cupelGvlok1ZL65hmfOgooBq2d_j9lLb1NgH6WIyDFeCc"
                      alt=""
                    />
                  </div>

                  <div className="member-name">
                    <span>{member.username}</span>
                    <i className="fas fa-poop"></i>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-user-display-wrapper">
            <div className="no-user-display-description-1">
              <span>Opps! No friends found...</span>
            </div>

            <div className="no-user-display-description-2">
              <span>
                Please join or create a group chat, we will show your active
                friends here
                <i className="fas fa-smile"></i>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberList;
