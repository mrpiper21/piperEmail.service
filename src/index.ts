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

// Connect to MongoDB, then start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

app.use(morgan('dev'));
app.use(
	cors({
		origin: ["*", "https://ornamastudios.com/"],
	})
);
app.use(express.json());

app.use("/api/mail", mailRouter);

// MongoDB connection

// Basic route
app.get('/', (req, res) => {
  res.send('Piper Email Service is running!');
}); 