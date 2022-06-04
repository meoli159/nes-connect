const express = require ('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)
const mongoose = require ('mongoose')
const cors = require ('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.port ||3333
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3333",
        methods:["GET","POST"]
    }
}) 
app.use(helmet())
app.use(cors())
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

io.on('connection', (socket) => {
    console.log('User connected',socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



server.listen(port, ()=> {
    console.log('Server is listen to port:', port)
})