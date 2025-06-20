import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// get profile
const profile = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: "halodek",
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Something error in the server"
        })
    }
}

export {
    profile
}