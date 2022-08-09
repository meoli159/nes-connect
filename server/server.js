const express = require ('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const http = require('http')
const {Server} = require('socket.io')

const { checkUser, requireToken } = require('./middlewares/authJwt');
const api = require('./routes/index')
const auth = require('./routes/user')
const controller = require("./controllers/auth.controller");

const app = express()


//Env file & DB connect
dotenv.config()
require("./database/DBconnect")






//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({   
    origin:"*",
    methods:['GET,POST'],
    credentials: true,
}));

//Routes
app.use("/api", api)
app.use("/auth", auth)
app.get("*", checkUser);


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
    controller.initial();
})