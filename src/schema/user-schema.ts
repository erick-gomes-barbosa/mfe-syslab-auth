import { z } from "zod";
import { isValidOpeningHours } from "../validators/is-valid-opening-hours";
import { isValidDepartureTime } from "../validators/is-valid-departure-time";
import { emailField } from "../fields/email-field";
import { passwordField } from "../fields/password-field";

export const UserSchema = z
  .object({
    //Validação do número de matrícula do usuário
    registery: z
      .number()
      .int()
      .refine((value) => value.toString().length === 10, {
        message: "A matrícula deve ter exatamente 10 caractere numéricos",
      }),

    //Validação de email
    email: emailField,

    //Validação de senha
    password: passwordField,

    //Validação de nome
    name: z
      .string()
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
        "O nome deve possuir sobrenome e deve conter apenas letras alfabéticas"
      ),

    //Validação do tipo de usuário
    type: z.enum(["Administrador", "Técnico", "Aluno", "Professor"]),

    //Validação do horário de entrada do usuário
    entry_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .refine(
        (entry_time) => {
          const isValidEntryTime = isValidOpeningHours(entry_time);
          if (isValidEntryTime) return entry_time;
        },
        { message: "Horário de entrada inválido" }
      ),

    //Validação do horário de saída do usuário
    departure_time: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .superRefine((data, ctx) => {
    const departureTime = data.departure_time;
    const entryTime = data.entry_time;

    const departureTimeIsValid = isValidDepartureTime(entryTime, departureTime);

    if (departureTimeIsValid) return departureTime;

    ctx.addIssue({
      path: ["departure_time"],
      code: "custom",
      message: "Horário de saída inválido",
    });
  });
