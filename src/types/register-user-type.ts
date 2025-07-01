import { z } from "zod";
import { registerUserSchema } from "../schema/register-user-schema";

export type RegisterUserType = z.infer<typeof registerUserSchema>;
