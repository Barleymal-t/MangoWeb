import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number",
        })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Password must contain at least one special character",
        }),
});

// Signup schema (customize as needed)
export const signupSchema = loginSchema.extend({
    name: z.string().min(1, { message: "Name is required" }),
});
