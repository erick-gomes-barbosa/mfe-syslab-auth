import { z } from "zod";
import { emailField } from "../fields/email-field";
import { passwordField } from "../fields/password-field";

export const LoginSchema = z.object({
  email: emailField,
  password: passwordField,
});
