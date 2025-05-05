import express from 'express'
import dotenv from 'dotenv'
import router from './routes/userRoute';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI as string


mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to DB!!")
})

const app = express();
app.use(express.json());



app.use('/api/v1', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})