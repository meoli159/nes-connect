const express = require ('express')
const cors = require ('cors')

const bodyparser =require ('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

//middleware
app.use(express.json())
app.use(helmet())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Hello")
})

//connect to mongodb 
require("./database/DBconnect")

//API


//Port
const port = process.env.port||3333
app.listen(port, ()=> {
    console.log('Server is listen to port:', port)
})