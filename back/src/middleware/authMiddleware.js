import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const authenticateJWT = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { role: true },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        req.user.id = user.id;
        req.user.role = user.role.name;
        next();
    } catch (error) {
        console.error('JWT Authentication Error:', error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

// Middleware to Authorize Based on Roles
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access forbidden: insufficient rights.' });
        }
        next();
    };
};