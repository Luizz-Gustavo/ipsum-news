import express from 'express';
import cors from 'cors';
import router from './src/routes.js';
import {
  authApiLimiter,
  createPostLimiter,
  loginLimiter
} from './src/middleware/rateLimiter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { startCleanupService } from './src/controllers/utils/cleanupExpiredCodes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}));

app.use(cookieParser());

app.use('/', router);

// Rate limit for login
app.use('/login', loginLimiter);

// Rate limit for authenticated routes
app.use('/me', authApiLimiter);
app.use('/users', authApiLimiter);
app.use('/create-user', authApiLimiter);
app.use('/update-user', authApiLimiter);
app.use('/disable-user', authApiLimiter);
app.use('/create-category', authApiLimiter);
app.use('/disable-category', authApiLimiter);

app.use('/new-post', createPostLimiter);
app.use('/update-post', createPostLimiter);
app.use('/posts-list', authApiLimiter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startCleanupService();
});

export default app;