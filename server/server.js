const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
//Env file & DB connect
dotenv.config();
require("./database/DBconnect");
const app = express();

const auth = require("./routes/auth");
const user = require("./routes/user");
const message = require("./routes/message");
const community = require("./routes/community");

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/auth", auth);
app.use("/api/community", community);
app.use("/api/user", user);
app.use("/api/message", message);

//-------------------Deployment-------------------
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1,'/client/build')));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname1,"client","build","index.html"))
//   })
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running successfully");
//   });
// }
//-------------------Deployment-------------------

//Port
const PORT = process.env.PORT || 3333;

const server = app.listen(PORT,
  console.log("Server is listen to port:", PORT),
);

//socket
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  //console.log("Io connected");

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

  socket.on("join-stream", stream => {
    socket.join(stream.streamId);
    socket.to(stream.streamId).emit('new-user-connect', stream.userId);
    socket.on('disconnect', () => {
      socket.to(stream.streamId).emit('user-disconnected', stream.userId);
    });

    /*
    if (users[streamID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[streamID].push(socket.id);
    } else {
      users[streamID] = [socket.id];
    }
    const usersInThisRoom = users[streamID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);*/

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
