import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI
        if(!mongoUri) {
            throw new Error('MONGO_URI is not defined')
        }
        const connect = await mongoose.connect(mongoUri , {})
        console.log('Database Connected')
    } catch (error) {
        console.log('Database connection error:',error)
        process.exit(1)
    }
}

export default connectDB