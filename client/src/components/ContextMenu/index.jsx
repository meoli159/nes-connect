import React, { useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  removeUserFromCommunityThunk,
  transferCommunityAdminThunk,
} from "../../redux/community/communityThunk";
import { selectCommunity } from "../../redux/message/messageSlice";

export function ContextMenu({ point }) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  const communityAdmin = currentCommunity.communityAdmin;
  const selectedUser = useSelector(
    (state) => state.communitySidebar?.selectedUser
  );

  const kickUser = () => {
    let data = {
      communityId: currentCommunity._id,
      user: selectedUser._id,
    };
    if (!currentCommunity||!selectedUser) return;
    dispatch(removeUserFromCommunityThunk(data)).then((res) => {
      socket.emit("community.user.remove", res.payload);
    });
  };

  const transferAdmin = () => {
    let data = {
      communityId: currentCommunity._id,
      userId: selectedUser._id,
    };
    if (!currentCommunity||!selectedUser) return;
    dispatch(transferCommunityAdminThunk(data)).then((res) => {
      socket.emit("community.communityAdmin.update", res.payload);
      dispatch(selectCommunity(res.payload));
    });
  };
  return (
    <>
      {communityAdmin?._id === user?._id &&
      selectedUser?._id !== user?._id &&
      selectedUser?._id ? (
        <div
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            padding: "5px 5px 5px 5px",
          }}
          className="ContextMenu"
        >
          <button className="transfer-owner" onClick={transferAdmin}>
            Transfer Owner
          </button>

          <div className="separator-10"></div>

          <button className="kick-user" onClick={kickUser}>
            Kick User
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
