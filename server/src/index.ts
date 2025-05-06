import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute';
import accountRouter from './routes/accountRoutes'
import mongoose from 'mongoose';
import cors from 'cors'

dotenv.config();

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI as string


mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to DB!!")
})

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/account', accountRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})