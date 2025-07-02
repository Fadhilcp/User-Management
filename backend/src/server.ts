import dotenv from 'dotenv'
dotenv.config()

import app from "./app";

import connectDB from './config/db'

connectDB()



const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log('Server is running at http://localhost:3000')
})