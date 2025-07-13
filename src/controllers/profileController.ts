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

const updateProfile = async (req: Request, res: Response) => {
    const user = req.user;
    const {username} = req.body;

    try{
        // Cek apakah username sudah digunakan (jika username diupdate)
        if (username) {
            const existingUsername = await prisma.user.findFirst({
                where: {
                    username: username,
                    id: { not: Number(user?.userId) } // Exclude current user
                }
            });

            if (existingUsername) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Username sudah digunakan',
                    data: null
                });
                return;
            }
        }

        // Update profile
        const updateData: any = {};
        if (username) updateData.username = username;

        const updatedProfile = await prisma.user.update({
            where: {
                id: Number(user?.userId)
            },
            data: updateData,
            select: {
                id: true,
                username: true,
                updated_at: true
            }
         });

        res.status(200).json({
            status: 'success',
            message: 'Profile berhasil diperbarui',
            data: updatedProfile
        });

    }catch(error){
        console.log('error: ', error);
        res.status(500).json({
            status: 'failed',
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
}

const changePassword = async (req: Request, res: Response) => {

    const user = req.user;
    const { currentPassword, newPassword } = req.body;


    try{  
        // Validasi panjang password baru
        if (newPassword.length < 6) {
            res.status(400).json({
                status: 'failed',
                message: 'Password baru minimal 6 karakter',
                data: null
            });
            return;
        }

        // Get current user with password
        const currentUser = await prisma.user.findUnique({
            where: {
                id: Number(user?.userId)
            }
        });

        if (!currentUser) {
            res.status(404).json({
                status: 'failed',
                message: 'User tidak ditemukan',
                data: null
            });
            return;
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isPasswordValid) {
            res.status(400).json({
                status: 'failed',
                message: 'Password saat ini tidak valid',
                data: null
            });
            return;
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await prisma.user.update({
            where: {
                id: Number(user?.userId)
            },
            data: {
                password: hashedNewPassword
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Password berhasil diubah',
            data: null
        });

    }catch(error){
        console.log('error: ', error);
        res.status(500).json({
            status: 'failed',
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
}

export {
    profile,
    updateProfile,
    changePassword
}