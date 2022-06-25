const express = require ('express')
const cors = require ('cors')
const bodyParser =require ('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()
const cookieParser = require('cookie-parser');
const { checkUser, requireToken } = require('./middlewares/authJwt');


//Env file & connect require
dotenv.config()
require("./database/DBconnect")


//Routes
const api = require('./routes/api')
const routers = require("./routes/index");
app.use('/api', routers)


//Middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api',api)



//Port
app.listen(process.env.PORT, ()=> {
    console.log('Server is listen to port:', process.env.PORT)
})
