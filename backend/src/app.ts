import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fs from "fs";
// Load environment variables explicitly
dotenv.config();



// Only load .env if it exists (e.g., local development)
if (fs.existsSync(".env")) {
  dotenv.config();
}
// const dotenvResult = dotenv.config();
// if (dotenvResult.error) {
//   console.error('Error loading .env file:', dotenvResult.error);
//   process.exit(1);
// }

// console.log('Environment variables loaded:', {
//   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? '****' : undefined,
//   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '****' : undefined,
//   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '****' : undefined,
// });

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    abortOnLimit: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use(errorHandler);

export default app;