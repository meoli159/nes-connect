import React from 'react';
import { useSelector } from "react-redux";
import "./style.css";

function OfflineUser() {

  const currentCommunity = useSelector(
    (state) => state.messages.currentCommunity?.communityName
  );

  const user = useSelector((state) => state.auth.login?.currentUser);
  const picture = user.pic;

  const offlineUsers = 
  [{username: "test 4"}]
  ;

  return (
    <div>
      <div>
        {currentCommunity ? (
          <div>
            {/*Offline Member display */}
            {offlineUsers?.map((user) => {
              return (
                <div className="offline-member-in-chat-wrapper" key={user._id}>
                  <div className="offline-member-image img">
                    <img
                      src={picture}
                      alt=""
                    />
                  </div>

                  <div className="offline-member-name-wrapper">
                    <span className="offline-member-name">
                      {user.username}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
         <div>
         </div>
        )}
      </div>
    </div>
  )
}

export default OfflineUser;