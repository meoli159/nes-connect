const express = require ('express')
const cors = require ('cors')

//const bodyparser =require ('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()

//Env file & connect require
dotenv.config()
require("./database/DBconnect")

//Routes
const user = require('./routes/User')


//Middleware
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/user',user)



//Port
app.listen(process.env.PORT, ()=> {
    console.log('Server is listen to port:', process.env.PORT)
})