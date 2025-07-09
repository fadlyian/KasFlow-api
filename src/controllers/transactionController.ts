import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { calculateBalance } from "../utils/pocketUtils";
import { TransactionType } from "../types/TransactionType";

const prisma = new PrismaClient();

const index = async (req: Request, res: Response) => {
    const user = req.user;
    const pocketId = req.params.pocketId;

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: Number(user?.userId),
                pocketId: Number(pocketId),
            },
        });

        res.status(200).json({
            status: "success",
            message: "Transaksi berhasil diambil",
            data: transactions
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
            data: null
        });
    }
}

const create = async (req: Request, res: Response) => {
    const user = req.user;
    const pocketId = req.params.pocketId;
    const { amount, description, type, categoryId } = req.body;

    try {
        const pocket = await prisma.pocket.findUnique({
            where: {
                id: Number(pocketId),
                userId: Number(user?.userId),
            },
        });

        if (!pocket) {
            res.status(404).json({
                status: "failed",
                message: "Pocket tidak ditemukan atau bukan milik user",
                data: null
            });
        }

        if (type === "EXPENSE" && Number(amount) > Number(pocket?.balance)) {
            res.status(400).json({
                status: "failed",
                message: "Saldo tidak cukup",
                data: null
            });
        }

        const newBalance = calculateBalance(
            Number(pocket?.balance),
            Number(amount),
            type as TransactionType
        );

        const transaction = await prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.create({
                data: {
                    userId: Number(user?.userId),
                    categoryId: Number(categoryId),
                    pocketId: Number(pocketId),
                    amount: Number(amount),
                    type: type,
                    description: description,
                    date: new Date(),
                }
            });

            await tx.pocket.update({
                where: { id: Number(pocketId) },
                data: { balance: newBalance }
            });

            return transaction;
        });

        res.status(200).json({
            status: "success",
            message: "Transaksi berhasil dibuat",
            data: transaction
        });

    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
            data: null
        });
    }
}

const getDetail = async (req: Request, res: Response) => {
    const user = req.user;
    const transactionId = req.params.transactionId;

    const transaction = await prisma.transaction.findUnique({
        where: {
            id: Number(transactionId),
            userId: Number(user?.userId),
        },
    });

    if (!transaction) {
        res.status(404).json({
            status: "failed",
            message: "Transaksi tidak ditemukan atau bukan milik user",
            data: null
        });
    }

    res.status(200).json({
        status: "success",
        message: "Transaksi berhasil diambil",
        data: transaction
    });
}

const deleteTransaction = async (req: Request, res: Response) =>{
    const user = req.user;
    const transactionId = req.params.transactionId;
    const pocketId = req.params.pocketId;

    const pocket = await prisma.pocket.findUnique({
        where: {
            id: Number(pocketId),
            userId: Number(user?.userId),
        },
    });

    if (!pocket) {
        res.status(404).json({
            status: "failed",
            message: "Pocket tidak ditemukan atau bukan milik user",
            data: null
        });
    }

    const deletedTransaction = await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.delete({
            where: {
                id: Number(transactionId),
                userId: Number(user?.userId),
            },
        });

        const newBalance = calculateBalance(
            Number(pocket?.balance),
            Number(transaction?.amount),
            transaction?.type === "EXPENSE" ? "INCOME" : "EXPENSE" as TransactionType
        );

        await tx.pocket.update({
                where: { id: Number(transaction?.pocketId) },
                data: { balance: newBalance }
            });

        return transaction;
    });

    res.status(200).json({
        status: "success",
        message: "Transaksi berhasil dihapus",
        data: deletedTransaction
    });
}

export { index, create, getDetail, deleteTransaction };