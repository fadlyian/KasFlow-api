import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Register Controller
const register = async (req: Request, res: Response) => {
    const {
        username,
        email,
        password
    } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    })

    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword
        }
    });

    res.status(201).json({
        message: "User berhasil dibuat",
        data: {
            username: newUser.username,
            email: newUser.email,
        },
    })
};

// Login Controller
const login = async (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } })
    if (!user || !(await bcrypt.compare(password, user?.password))) {
        res.status(400).json({ message: "User atau password salah" })
    }

    const token = jwt.sign(
        {
            userId: user?.id,
            email: user?.email,
        },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
    );

    res.status(200).json({
        message: "Login berhasil",
        token
    });

};

export {
    register,
    login,
}