// fields.ts
import { z } from "zod";

export const emailField = z
  .string()
  .email("Informe um email válido")
  .toLowerCase()
  .refine(
    (email) => {
      const domain = email.split("@")[1];
      return [
        "yahoo.com",
        "outlook.com",
        "baymetrics.com",
        "gmail.com",
      ].includes(domain);
    },
    {
      message: "O email deve ser do tipo 'baymetrics', 'outlook' ou 'yahoo'.",
    }
  )
  .transform((email) => {
    const [user, domain] = email.split("@");
    return user.replace(/\./g, "") + "@" + domain;
  });
