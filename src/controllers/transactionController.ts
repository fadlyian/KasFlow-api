import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { calculateBalance } from "../utils/pocketUtils";
import { TransactionType } from "../types/TransactionType";
import formatDate from "../utils/formatDate";

const prisma = new PrismaClient();

const index = async (req: Request, res: Response) => {
    const user = req.user;
    const pocketId = req.params.pocketId;

    try {
         // Validasi apakah pocket milik user
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

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: Number(user?.userId),
                pocketId: Number(pocketId),
            },
            orderBy: {
                id: 'desc'
            }
        });

        const formattedTransactions = transactions.map(transaction => ({
            ...transaction,
            date: formatDate(transaction.date)
        }))            

        res.status(200).json({
            status: "success",
            message: "Transaksi berhasil diambil",
            data: transactions.length > 0 ? formattedTransactions : []
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

        const formattedTransaction = {
            ...transaction,
            date: formatDate(transaction.date)
        };

        res.status(200).json({
            status: "success",
            message: "Transaksi berhasil dibuat",
            data: formattedTransaction
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

const updateTransaction = async (req: Request, res: Response) => {
    const user = req.user;
    const transactionId = req.params.transactionId;
    const pocketId = req.params.pocketId;
    const { amount, description, type, categoryId } = req.body;

    const updateTransaction = await prisma.$transaction(async (tx) => {
        const pocket = await tx.pocket.findUnique({
            where: {
                id: Number(pocketId),
                userId: Number(user?.userId),
            } 
        });

        const oldTransaction = await tx.transaction.findUnique({
            where: {
                id: Number(transactionId),
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

        const oldBalance = calculateBalance(
            Number(pocket?.balance),
            Number(oldTransaction?.amount),
            oldTransaction?.type === "EXPENSE" ? "INCOME" : "EXPENSE"
        )

        const newBalance = calculateBalance(
            Number(oldBalance),
            Number(amount),
            oldTransaction?.type as TransactionType
        )
        
        const transaction = await tx.transaction.update({
            where: {
                id: Number(transactionId),
                userId: Number(user?.userId),
            },
            data: {
                amount: Number(amount),
                description: description,
                type: type,
                categoryId: Number(categoryId),
            },
        });      

        await tx.pocket.update({
            where: { id: Number(pocketId) },
            data: { balance: newBalance }
        });

        return transaction;
    });

    res.status(200).json({
        status: "success",
        message: "Transaksi berhasil diubah",
        data: updateTransaction
    });
}


const deleteTransaction = async (req: Request, res: Response) =>{
    const user = req.user;
    const transactionId = req.params.transactionId;
    const pocketId = req.params.pocketId;

    try{
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

        const transaction = await prisma.transaction.findFirst({
            where: {
                id: Number(transactionId),
                userId: Number(user?.userId),
            },
        })

        if(!transaction){
            throw new Error(`CANT_FIND_TRANSACTION`);
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
    }catch(error:any){
        console.log('error: ', error);
        if(error.message === `CANT_FIND_TRANSACTION`){
            res.status(400).json({
                status: "failed",
                message: "Tidak bisa menemukan Transaksi",
                data: null
            });
        }
        res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
            data: null
        });
    }

}

export { index, create, updateTransaction, deleteTransaction };