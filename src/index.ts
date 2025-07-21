import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import mailRouter from "./routes/email.route"
import dotEnv from 'dotenv'

dotEnv.config()

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/piper-emailService';

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/mail', mailRouter)

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Piper Email Service is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 