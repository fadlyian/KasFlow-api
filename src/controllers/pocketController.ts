import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// GET ALL pocket
const index = async (req: Request, res: Response) => {
    const user = req.user;
    const pockets = await prisma.pocket.findMany({
        where: {
            userId: Number(user?.userId)
        },
        select: {
            id: true,
            name: true,
            balance: true,
            type: true,
        },
        orderBy: {
            id: 'desc'
        }
    })

    res.status(200).json({
        status: true,
        message: "Daftar pocket berhasil diambil",
        data: pockets
    });
}

// CREATE NEW Pocket
const createPocket = async (req: Request, res: Response) => {
    try {
        const { name, type, balance } = req.body
        const user = req.user;

        const existingPocket = await prisma.pocket.findFirst({ where: { name: name } });

        if (existingPocket) {
            res.status(400).json({
                status: false,
                message: "Nama pocket sudah digunakan",
                data: null
            });
        }

        await prisma.pocket.create({
            data: {
                userId: Number(user?.userId),
                name: name,
                type: type,
                balance: balance
            }
        })
        res.status(201).json({
            status: true,
            message: "Pocket berhasil dibuat",
            data: {
                name,
                type,
                balance,
            }
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: 'failed',
            trace: error,
            message: "Terjadi kesalaha pada server",
            data: null
        });
    }
}

export {
    index,
    createPocket,
}