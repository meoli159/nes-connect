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
    !usersData.some((user) => user.userId === userId) &&
      usersData.push( {userId, socketId} );
  };

  const removeUser = (socketId) => {
    usersData = (usersData.filter((user) => user.socketId !== socketId));
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

    socket.on("onCommunityJoin", (room) => {
      socket.join(room._id);
      console.log("joined community " + room._id, room.communityName);
    });

    socket.on("getOnlineCommunityUsers", (room) => {
      if (!room._id) return;
      let onlineUsers = [];
      let offlineUsers = [];
      room.users.forEach((user) => {
        const getUserSocket = usersData.some(
          (userD) => user._id == userD.userId
        );

        getUserSocket ? onlineUsers.push(user) : offlineUsers.push(user);
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
