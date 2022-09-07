const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
//Env file & DB connect
dotenv.config();
require("./database/DBconnect");
const app = express();

const auth = require("./routes/auth");
const user = require("./routes/user");
const message = require("./routes/message");
const group = require("./routes/group");
const roleData = require("./database/RoleData");

//Middleware

app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/auth", auth);
app.use("/api/group", group);
app.use("/api/user", user);
app.use("/api/message", message);
// app.get("*", checkUser);

//-------------------Deployment-------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1,'/client/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"client","build","index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}
//-------------------Deployment-------------------

//Port
const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log("Server is listen to port:", port);
  roleData.initial();
});

//socket
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(userData);
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(" joined room " + room);
  });
  socket.on("new message", (newMessageReceived) => {
    var group = newMessageReceived.data.group;
    if (!group.users) return console.log("group.user not defined");
    group.users.forEach((user) => {
      if (user._id === newMessageReceived.data.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
