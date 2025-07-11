import { z } from "zod";
import { isValidOpeningHours } from "../validators/is-valid-opening-hours";
import { isValidDepartureTime } from "../validators/is-valid-departure-time";
import { emailField } from "../fields/email-field";
import { passwordField } from "../fields/password-field";

// Schema de validação para o cadastro de usuários
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
    username: z
      .string()
      .trim()
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
        "O nome deve possuir sobrenome e deve conter apenas letras alfabéticas"
      ),

    //Validação do tipo de usuário
    usertype: z.enum(["Administrador", "Técnico", "Aluno", "Professor"]),

    //Validação do horário de entrada do usuário
    entry_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .refine(
        (entry_time) => {
          const isValidEntryTime = isValidOpeningHours(entry_time);
          //Retorna o horário de entrada adaptado para o tipo timetz
          if (isValidEntryTime) return entry_time;
        },
        { message: "Horário de entrada inválido" }
      )
      .transform((entryTime) => entryTime + ":00-3:00"),

    //Validação do horário de saída do usuário
    departure_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .transform((departureTime) => departureTime + ":00-3:00"),
  })
  .superRefine((data, ctx) => {
    const departureTime = data.departure_time;
    const entryTime = data.entry_time;

    const departureTimeIsValid = isValidDepartureTime(entryTime, departureTime);

    //Retorna o horário de saída adaptado para o tipo timetz
    if (departureTimeIsValid) return departureTime + ":00-3:00";

    ctx.addIssue({
      path: ["departure_time"],
      code: "custom",
      message: "Horário de saída inválido",
    });
  });
