// fields.ts
import { z } from "zod";

export const passwordField = z
  .string()
  .min(10, "A senha deve conter pelo menos 10 caracteres")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(
    /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]\/~`]/,
    "A senha deve conter pelo menos um caractere especial"
  );
