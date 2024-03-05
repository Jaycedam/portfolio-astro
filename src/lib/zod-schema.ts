import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(3),
});

export type EmailForm = z.infer<typeof emailSchema>;
