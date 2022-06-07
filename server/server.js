const express = require ('express')
const cors = require ('cors')

const mongoose = require ('mongoose')

const bodyparser =require ('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://tien2501:9855157a@cluster0.etmsu.mongodb.net/?retryWrites=true&w=majority')

        console.log('Connected to MongoDB')
    }
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()


app.use(helmet())
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello")
})

//API
// const user = require('/api/users');
// app.use('/api/users', users)


////////////////////////////////////
const port = process.env.port ||3333
app.listen(port, ()=> {
    console.log('Server is listen to port:', port)
})