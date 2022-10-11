exports.socketConnection = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
  });

  let usersData = [];

  const addUser = (userId, socketId) => {
    !usersData.some((data) => data.userId === userId) &&
      usersData.push({ userId, socketId });
  };
  const removeUser = (socketId) => {
    usersData = usersData.filter((data) => data.socketId !== socketId);
  };
  const getUserSocket = (user) => {
   return usersData.some((data) => user._id == data.userId);
  
  };

  io.on("connection", (socket) => {
    socket.on("connected", (data) => {
      addUser(data, socket.id);
      io.emit("getUsers", usersData);
      console.log("a user connected: " + data);
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", usersData);
    });

    // socket.on("onCommunityReceiveNewUser",(user)=>{
    //   if(!room._id) return;
    //   const socket = getUserSocket(user)
    // })

    socket.on("onCommunityJoin", (room) => {
      socket.join(room._id);
      console.log("joined community " + room._id, room.communityName);
    });

    socket.on("getOnlineCommunityUsers", (room) => {
      if (!room._id) return;
      let onlineUsers = [];
      let offlineUsers = [];
      room.users.forEach((user) => {
        const socket = getUserSocket(user);

        socket ? onlineUsers.push(user) : offlineUsers.push(user);
      });

      socket.emit("onlineCommunityUsersReceived", {
        onlineUsers,
        offlineUsers,
      });
    });

    socket.on("onMessage", (newMessageReceived) => {
      var community = newMessageReceived.community;
      if (!community.users) return console.log("community users not defined");
      if (community._id == newMessageReceived.sender._id) return;
      socket.to(community._id).emit("onReceivedMessage", newMessageReceived);
    });
  });
};
