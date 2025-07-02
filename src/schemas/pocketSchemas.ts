import { z } from "zod";

// Definisikan tipe Pocket yang mungkin, sesuaikan dengan kebutuhan aplikasi Anda
const pocketTypes = ['bank', 'e_wallet', 'cash'] as const;

const createPocketSchema = z.object({
    name: z
        .string({
            required_error: "Nama pocket wajib diisi",
            invalid_type_error: "Nama harus berupa teks",
        })
        .min(3, { message: "Nama pocket minimal harus 3 karakter" }),

    type: z
        .enum(pocketTypes, {
            errorMap: () => ({ message: `Tipe pocket harus salah satu dari: ${pocketTypes.join(', ')}` })
        }),

    balance: z
        .number({
            required_error: "Saldo awal wajib diisi",
            invalid_type_error: "Saldo harus berupa angka",
        })
        .nonnegative({ message: "Saldo tidak boleh negatif" })
        .default(0), // Opsi: Memberi nilai default jika tidak disediakan
});


const updatePocketSchema = z.object({
    name: z.string().min(3).optional(),
    type: z.enum(pocketTypes).optional(),
    balance: z.number().nonnegative().optional(),
});

export {
    createPocketSchema,
    updatePocketSchema,
}