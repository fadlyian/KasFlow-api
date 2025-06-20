import { z } from 'zod'

const userRegisterSchema = z.object({
    username: z.string({ required_error: "Username wajib diisi" }),
    email: z.string({ 
        required_error: "Email wajib diisi", 
        invalid_type_error: "Format email tidak valid" 
    }).email("Format email tidak valid"),
    password: z.string().min(8),
})

const userLoginSchema = z.object({
    email: z.string(),
    password: z.string().min(8),
})

export {
    userRegisterSchema,
    userLoginSchema
}