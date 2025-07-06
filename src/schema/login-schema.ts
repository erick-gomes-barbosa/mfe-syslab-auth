import { z } from "zod";
import { emailField } from "../fields/email-field";
import { passwordField } from "../fields/password-field";

// Schema de validação para o login de usuários
export const LoginSchema = z.object({
  email: emailField,
  password: passwordField,
});
