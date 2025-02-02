import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Identifier and password are required.' });
  }

  if (req.cookies && req.cookies.jwt) {
    return res.status(401).json({ error: 'Already logged in.' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { nickname: identifier }
        ]
      },
      include: { role: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials', code: 'USER_NOT_FOUND' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid Credentials', code: 'INVALID_PASSWORD' });
    }

    if (user.status === false) {
      return res.status(401).json({ error: 'Account is deactivated.', code: 'ACCOUNT_DEACTIVATED' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.name, name: user.name, lastName: user.lastName, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Logged in successfully.' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const logout = (req, res) => {
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  try {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    res.clearCookie('jwt', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, lastName, nickname, email, password } = req.body;

    // Required fields validation
    if (!name || !lastName || !nickname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
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
    const defaultRoleId = 3;

    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        nickname,
        email,
        password: hashedPassword,
        roleId: defaultRoleId,
        status: true
      }
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Invalid Credentials' });
    }

    // Remover informações sensíveis
    const { password, ...userWithoutPassword } = user;
    userWithoutPassword.role = user.role.name;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};