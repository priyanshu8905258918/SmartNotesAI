console.log("===== INDEX FILE LOADED =====");

import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import connectDB from './config/db.js';
import masterRouter from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const allowedOrigins = [env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
// Serve uploads folder statically
app.use('/uploads', express.static('uploads'));

// Test Routes
app.get('/', (req, res) => {
  res.send('SmartNotes AI Backend Running');
});

// app.get('/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Backend Healthy',
//   });
// });

// API Routes
app.use('/api', masterRouter);

// Centralized Error Middleware
app.use(errorMiddleware);

// Start Server
const server = app.listen(env.PORT, () => {
  console.log(` SmartNotes AI Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

// Handle uncaught errors
process.on('unhandledRejection', (reason) => {
  console.error(' Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error(' Uncaught Exception:', error);
  process.exit(1);
});
