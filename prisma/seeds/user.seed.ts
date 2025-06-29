import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedUser(){
    await prisma.user.createMany({
        data: [
            {
                username: 'ian',
                email: 'ian@gmail.com',
                password: await bcrypt.hash('password', 10)
            },
            {
                username: 'adam',
                email: 'adam@gmail.com',
                password: await bcrypt.hash('password', 10)
            },
        ],
        skipDuplicates: true, // Agar tidak erro jika sudah ada
    });
}