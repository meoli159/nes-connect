const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const helmet = require('helmet')
const io = require('socket.io')
const dotenv = require('dotenv')
const { listen } = require('express/lib/application')
dotenv.config()

const port = process.env.port
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello")
})


app.post("/post",(req,res)=>{ //Check connect from FE to BE
    console.log("Connect to react")
    res.redirect("/")
})


app.listen(port, ()=> {
    console.log('Server is listen to port:', port)
})