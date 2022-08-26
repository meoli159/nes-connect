import React from "react";

import "./style.css";

export function ServerChatRoom() {
  const listRooms = [
    { id: 1, roomName: "Overlord" },
    { id: 2, roomName: "DeadZone" },

  ];
  return (
    <div>
      <div>
        {listRooms?.map((room) => {
          return (   
            <div className="server-chat-room" key={room.id}>
              <div className="server-chat-room-name">
                <p>{room.roomName}</p>
              </div>
            </div>
          );
        })}
        <div className="server-chat-room">
          <div className="server-chat-room-name">
            <p>Room 1</p>
          </div>
        </div>

        <div className="server-chat-room">
          <div className="server-chat-room-name">
            <p>Room 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerChatRoom;
