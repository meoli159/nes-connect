exports.socketConnection = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("joined room " + room);
    });

    socket.on("new message", (newMessageReceived) => {
      var community = newMessageReceived.community;
      if (!community.users) return console.log("community users not defined");

      if (community._id == newMessageReceived.sender._id) return;

      socket.to(community._id).emit("received-message", newMessageReceived);
    });

    socket.off("setup", () => {
      socket.leave(userData._id);
    });
  });
};
