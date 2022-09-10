const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors")
//Env file & DB connect
dotenv.config();
require("./database/DBconnect");
const app = express();

const auth = require("./routes/auth");
const user = require("./routes/user");
const message = require("./routes/message");
const community = require("./routes/community");
const roleData = require("./database/RoleData");


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
const PORT = process.env.PORT || 3333 ;

const server = app.listen(PORT,
  console.log("Server is listen to port:", PORT),
  roleData.initial()
);

//socket
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors:{
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  console.log("Io connected")
  socket.on("send-message",data=>{
    io.emit("received-message",data)
  })
});
