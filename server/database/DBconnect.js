const mongoose = require ('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI) // change process.env.MONGO_URI to yours 

        console.log('Connected to MongoDB')
    }
    catch (error) {
        console.log(error)
        console.log('Could not connect to MongoDB')
        process.exit(1)
    }
}
connectDB()