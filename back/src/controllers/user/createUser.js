import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    try {
        const { name, lastName, nickname, email, password, roleId } = req.body;

        // Required fields validation
        if (!name || !lastName || !nickname || !email || !password || !roleId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Role validation
        const existingRole = await prisma.role.findFirst({ where: { id: roleId } });
        if (!existingRole) {
            return res.status(400).json({ error: 'Role does not exist' });
        }

        // Email validations
        if (!email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (email.length > 255) {
            return res.status(400).json({ error: 'Email must be less than 255 characters long' });
        }

        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Nickname validations
        if (nickname.length < 6) {
            return res.status(400).json({ error: 'Nickname must be at least 6 characters long' });
        }

        if (nickname.length > 30) {
            return res.status(400).json({ error: 'Nickname must be less than 30 characters long' });
        }

        // Nickname format validation - only allows letters, numbers, dots and underscores
        const nicknameRegex = /^[a-zA-Z0-9._]+$/;
        if (!nicknameRegex.test(nickname)) {
            return res.status(400).json({ error: 'Nickname can only contain letters, numbers, dots and underscores' });
        }

        const existingNickname = await prisma.user.findFirst({ where: { nickname } });
        if (existingNickname) {
            return res.status(400).json({ error: 'Nickname already exists' });
        }

        // Name validations
        if (name.length < 3) {
            return res.status(400).json({ error: 'Name must be at least 3 characters long' });
        }

        if (name.length > 125) {
            return res.status(400).json({ error: 'Name must be less than 125 characters long' });
        }

        // Last name validations
        if (lastName.length < 3) { 
            return res.status(400).json({ error: 'Last name must be at least 3 characters long' });
        }

        if (lastName.length > 125) {
            return res.status(400).json({ error: 'Last name must be less than 125 characters long' });
        }

        // Password validations
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        if (password.length > 125) {
            return res.status(400).json({ error: 'Password must be less than 125 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ 
            data: { 
                name, 
                lastName, 
                nickname,
                email, 
                password: hashedPassword, 
                roleId 
            } 
        });
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
} 