const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

//Env file & DB connect
dotenv.config();
require("./database/DBconnect");

const app = express();
const auth = require("./routes/auth");
const user = require("./routes/user");
const message = require("./routes/message");
const community = require("./routes/community");
const { socketConnection } = require("./utils/socket");

app.use(cors({ origin: ["http://localhost:3000","https://nes-connect.netlify.app"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const server = app.listen(PORT, console.log("Server is listen to port:", PORT));

socketConnection(server);
