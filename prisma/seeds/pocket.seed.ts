import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPocket(){
    await prisma.pocket.createMany({
        data: [
            {
                userId : 1,
                name: "Duit Cash",
                type: "cash",
                balance: 200000,
            },
            {
                userId : 1,
                name: "Bank Mandiri",
                type: "bank",
                balance: 2000000,
            },
            {
                userId : 2,
                name: "Duit",
                type: "cash",
                balance: 300000,
            },
            {
                userId : 2,
                name: "BCA",
                type: "bank",
                balance: 4000000,
            },
        ]
    })
}