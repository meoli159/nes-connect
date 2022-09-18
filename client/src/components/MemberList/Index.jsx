import { useSelector } from "react-redux";
import React from "react";
import "./style.css";
import { FaJenkins, FaMailchimp, FaGrinWink } from 'react-icons/fa';

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

  const user = useSelector((state) => state.auth.login?.currentUser);
  const picture = user.pic;

  return (
    <div>
      <div>
        {currentCommunity ? (
          <div>
            {/* Group Admin display */}

            <div className="member-in-chat-wrapper">
              <div className="member-image">
                <img
                  src={picture}
                  alt=""
                />
              </div>

              <div className="member-name-wrapper">
                <span className="host-name">
                  {currentCommunityAdmin?.username}
                </span>{" "}
                <div className="host-name-icon" >
                  <FaJenkins
                  />
                </div>
              </div>
            </div>

            {/* Member display */}
            {currentCommunityMember?.map((member) => {
              return (
                <div className="member-in-chat-wrapper" key={member._id}>
                  <div className="member-image img">
                    <img
                      src={picture}
                      alt=""
                    />
                  </div>

                  <div className="member-name-wrapper">
                    <span className="member-name">
                      {member.username}
                    </span>
                      <FaMailchimp 
                      className="member-name-icon"
                      />
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
