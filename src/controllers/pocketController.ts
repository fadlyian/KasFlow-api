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
            message: "Terjadi kesalaha pada server",
            data: null
        });
    }
}

// GET DETAIL Pocket
const getPocketDetail = async (req: Request, res: Response) => {
    try {
        const pocketId = Number(req.params.id);
        const user = req.user;

        if (isNaN(pocketId)) {
            return res.status(400).json({
                status: 'failed',
                message: "ID pocket tidak valid",
            });
        }

        const pocket = await prisma.pocket.findFirst({
            where: {
                id: pocketId,
                userId: Number(user?.userId)
            },
            select: {
                id: true,
                name: true,
                balance: true,
                type: true,
            }
        });

        if (!pocket) {
            return res.status(404).json({
                status: false,
                message: "Pocket tidak ditemukan",
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: "Detail pocket berhasil diambil",
            data: pocket
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: 'failed',
            message: "Terjadi kesalahan pada server",
            data: null
        });
    }
}

// UPDATE pocket
const updatePocket = async (req: Request, res: Response) => {
    try {
        const pocketId = Number(req.params.id);
        const user = req.user;

        const { name, type, balance } = req.body

        if (isNaN(pocketId)) {
            return res.status(400).json({
                status: 'failed',
                message: "ID pocket tidak valid",
            });
        }

        const updatedPocket = await prisma.pocket.update({
            where: {
                id: pocketId,
                userId: Number(user?.userId),
            },
            data: {
                name,
                type,
                balance
            }
        });

        // Kirim respons jika berhasil
        res.status(200).json({
            status: 'success',
            message: 'Pocket berhasil diperbarui',
            data: updatedPocket
        });

    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: 'failed',
            message: "Terjadi kesalahan pada server",
            data: null
        });
    }
};

const deletePocket = async (req: Request, res: Response) => {
    try {
        const pocketId = Number(req.params.id);
        const user = req.user;

        if (isNaN(pocketId)) {
            return res.status(400).json({
                status: 'failed',
                message: "ID pocket tidak valid",
            });
        }

        const deletedPocket = await prisma.pocket.delete({
            where: {
                id: pocketId,
                userId: Number(user?.userId),
            }
        })

        if (!deletedPocket) {
            res.status(404).json({
                status: 'failed',
                message: "Pocket tidak ditemukan atau Anda tidak memiliki akses",
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Pocket berhasil dihapus',
            data: null // Data bisa null karena item sudah dihapus
        });

    } catch (error) {
        console.log('error: ', error);

        res.status(500).json({
            status: 'failed',
            message: "Terjadi kesalahan pada server",
            data: null
        });
    }
}

export {
    index,
    createPocket,
    getPocketDetail,
    updatePocket,
    deletePocket,
}