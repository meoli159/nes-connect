const express = require ('express')
const cors = require ('cors')


const http = require('http')
const {Server} = require('socket.io')
const mongoose = require ('mongoose')

const bodyparser =require ('body-parser')
const server = http.createServer(app)
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

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

//API
const user = require('/api/users');
app.use('/api/users', users)


/////////////////////
io.on('connection', (socket) => {
    console.log('User connected',socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

////////////////////////////////////
const port = process.env.port ||3333
server.listen(port, ()=> {
    console.log('Server is listen to port:', port)
})