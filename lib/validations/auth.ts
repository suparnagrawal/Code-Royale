import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be atleast 8 characters long."),
});

export const registerSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, "Username should be 3-20 characters long")
    .max(20, "Username should be 3-20 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
