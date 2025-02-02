import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const sendMailCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Email not found!' });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.passwordResetCode.create({
      data: {
        code,
        userId: user.id,
        expiresAt
      }
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset - Verification Code',
      html: `
        <h1>Hello, ${user.name}</h1>
        <p>Your verification code to reset your password is:</p>
        <h2>${code}</h2>
        <p>This code is valid for 15 minutes.</p>
        <p>If you did not request a password reset, ignore this email.</p>
      `
    });

    res.status(200).json({ message: 'Code sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset code:', error);
    res.status(500).json({ error: 'Error sending code by email.' });
  }
};