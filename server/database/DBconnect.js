const mongoose = require ('mongoose')

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