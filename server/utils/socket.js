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
      // console.log("a user connected: " + data);
    });

    socket.on("disconnect", () => {
      // console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", usersData);
    });

    socket.on("onCommunityJoin", (community) => {
      socket.join(community._id);
      // console.log("joined community " + community._id, community.communityName);
    });

    socket.on("getOnlineCommunityUsers", (community) => {
      if (!community._id) return;
      let onlineUsers = [];
      let offlineUsers = [];
      community.users.forEach((user) => {
        getUserSocket(user) ? onlineUsers.push(user) : offlineUsers.push(user);
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

    socket.on("onCommunity", (data) => {
      if (!data) return;
      var community = data.community;

      
      io.to(community._id).emit("onCommunityReceiveNewUser", data);
      usersData.some((userD) => {
        if (data.user._id === userD.userId) {
          userD.socketId && socket.to(userD.socketId).emit("onCommunityAdd", data);
        }
      });
    });

    ////////////////////////////////
    socket.on("join-stream", stream => {
      socket.join(stream.streamId);
      socket.to(stream.streamId).emit('new-user-connect', stream.userId);
      socket.on('disconnect', () => {
        socket.to(stream.streamId).emit('user-disconnected', stream.userId);
      });
    });
  
    socket.on('newUserStart', (data) => {
      socket.to(data.to).emit('newUserStart', { sender: data.sender });
    });
  
    socket.on("sending signal", payload => {
      io.to(payload.streamID).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });
  
    socket.on("returning signal", payload => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });
  
    socket.on("sendDataClient", function(data) {
      console.log(data)
      io.emit("sendDataServer", { data });
    })
  });
};
