import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCategories(){
    await prisma.category.createMany({
        data: [
            {name: 'Makanan & Minuman'},
            {name: 'Transportasi'},
            {name: 'Tagihan'},
            {name: 'Hiburan'},
        ],
        skipDuplicates: true, // Agar tidak erro jika sudah ada
    });
}