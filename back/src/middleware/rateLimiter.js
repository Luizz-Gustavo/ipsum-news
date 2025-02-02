import rateLimit from 'express-rate-limit';

// specific Limiter for create/edit routes
export const createPostLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit of 10 posts per hour
  message: {
    error: 'Exceeded the limit of posts creation. Please try again in 10 minutes.'
  }
});

// Rate limit for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: {
    error: 'Too many login attempts. Please try again in 15 minutes.'
  }
});

// more restricted rate limit for endpoints that require previous authentication
export const authApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per IP
  message: {
    error: 'Exceeded the limit of requests for authenticated actions. Please try again in 15 minutes.'
  }
});