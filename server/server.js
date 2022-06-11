const express = require ('express')
const cors = require ('cors')

//const bodyparser =require ('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

//Routers
const userRouter = require('./routers/User')



//middleware
app.use(express.json())
app.use(helmet())
app.use(cors())


//connect to mongodb 
require("./database/DBconnect")

app.use('/api',userRouter)
//API


//Port
app.listen(process.env.PORT, ()=> {
    console.log('Server is listen to port:', process.env.PORT)
})