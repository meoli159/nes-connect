const mongoose = require ('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async ()=>{
    try{
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
    useUnifiedTopology: true
        }) // change process.env.MONGO_URI to yours 

        console.log('MongoDB Connected')
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB()