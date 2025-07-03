import { z } from "zod";
import { LoginSchema } from "../schema/login-schema";

export type LoginType = z.infer<typeof LoginSchema>;
