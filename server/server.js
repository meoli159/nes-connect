const express = require ('express')
const cors = require ('cors')

const bodyparser =require ('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello")
})

//connect to mongodb 
require("./database/DBconnect")

//API
// const user = require('/api/users');
// app.use('/api/users', users)


////////////////////////////////////
const port = process.env.port||3333
app.listen(port, ()=> {
    console.log('Server is listen to port:', port)
})