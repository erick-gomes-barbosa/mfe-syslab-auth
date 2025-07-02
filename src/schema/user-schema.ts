import { z } from "zod";
import { isValidOpeningHours } from "../validators/is-valid-opening-hours";
import { isValidDepartureTime } from "../validators/is-valid-departure-time";

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
    email: z
      .string()
      .email("Informe um email válido")
      .toLowerCase()
      .refine(
        (email) => {
          const domain = email.split("@"); //separa o texto que está antes e depois do "@"
          return (
            domain[1] === "yahoo.com" ||
            domain[1] === "outlook.com" ||
            domain[1] === "baymetrics.com" ||
            domain[1] === "gmail.com"
          );
        },
        {
          message:
            "O email deve ser do tipo 'baymetrics', 'outlook' ou 'yahoo'.",
        }
      )
      .transform((email) => {
        const emailPartition = email.split("@");

        //Armazena uma string sem pontos finais antes do "@" ex: "erick.cruz@gmail.com" para "erickcruz@gmail.com"
        const transformEmail =
          emailPartition[0].replace(/\./g, "") + "@" + emailPartition[1];

        return transformEmail;
      }),

    //Validação de senha
    password: z
      .string()
      .min(10, "A senha deve conter pelo menos 10 caracteres")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(
        /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]\/~`]/,
        "A senha deve conter pelo menos um caractere especial"
      ),

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
