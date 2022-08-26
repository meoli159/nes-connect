const express = require ('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const http = require('http')
const {Server} = require('socket.io')

const { checkUser } = require('./middlewares/authJwt');


const group = require('./routes/group')
//const controller = require("./controllers/auth.controller");

const api = require('./routes/auth')
const user = require('./routes/user')
const roleData = require('./database/RoleData');
const app = express()


//Env file & DB connect
dotenv.config()
require("./database/DBconnect")






//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", api)
app.use("/group", group)
app.use("/user", user)
// app.get("*", checkUser);


const server = http.createServer(app);
const io = new Server(server,cors)


//Real Time connection
io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on("join-room",()=>{
        console.log("user join a room")
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})

//Port
const port = process.env.PORT|| 3333;

server.listen(port, ()=> {
    console.log('Server is listen to port:', port);
    roleData.initial();
})