import { z } from "zod";
import { email } from "zod/dist/types/v4/core/regexes";

export const registerUserSchema = z.object({
  registery: z
    .number()
    .int()
    .refine((value) => value.toString().length === 10, {
      message: "A matrícula deve ter exatamente 10 caracteres",
    }),
  email: z.string(), //validar email
  password: z.string().min(10, "A senha deve ter no mínimo 10 caracteres"),
  name: z.string(),
  type: z.string(),
  entry_time: z.string(),
  departure_time: z.string(),
});
