import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import UsersRouter from './routes/UsersRouter'
import GameRouter from './routes/GameRouter'

import { ErrorHandler } from './middlewares/ErrorHandler'
import { logger } from './utils/logger';
import { startServer } from './utils/server';
import cors from 'cors';


// Load configuration variables
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const ENV = process.env.NODE_ENV || 'development';


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));

// Configure morgan based on environment
if (ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(`/api/users`, UsersRouter)
app.use(`/api/game`, GameRouter)
app.use(ErrorHandler);

// Use logger instead of console.log
logger.info('Server is starting...');

startServer(app, Number(PORT))

export default app;