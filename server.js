import express from 'express';
import { config } from 'dotenv';
import { resolve } from 'path'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import cors from 'cors';

config();

connectDB();

const PORT = process.env.PORT || 5001;

const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(cors({
    origin:process.env.ALLOWED.split(" "),
    methods:["GET","PUT","POST","DELETE"]
}));

app.use(express.json());

app.use('/api/v1/auth',authRoutes);

app.use('/api/v1/template',templateRoutes);

app.get('/',(req,res) => res.send("Hello World"));

app.use(notFound);

app.use(errorHandler);

app.listen(PORT,console.log(`Server started at ${PORT} in ${NODE_ENV}`));

