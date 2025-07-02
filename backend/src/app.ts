import express from 'express'
import cors from 'cors'

import userRoutes from './routes/user/user.route'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api',userRoutes)



export default app