import { z } from "zod";

export const signupSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().min(6),
  role: z.string(),
  gender: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
