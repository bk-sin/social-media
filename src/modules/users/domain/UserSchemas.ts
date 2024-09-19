import { errorMessages, userAuthConfig } from "@/config";
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(userAuthConfig.username.minLength, {
      message: errorMessages.username.minLength(
        userAuthConfig.username.minLength,
      ),
    })
    .max(userAuthConfig.username.maxLength, {
      message: errorMessages.username.maxLength(
        userAuthConfig.username.maxLength,
      ),
    })
    .regex(userAuthConfig.username.regex, {
      message: errorMessages.username.invalidChars,
    })
    .refine((value) => value.trim() === value, {
      message: errorMessages.username.noSpaces,
    }),

  email: z
    .string()
    .email({ message: errorMessages.email.invalid })
    .max(userAuthConfig.email.maxLength, {
      message: errorMessages.email.maxLength(userAuthConfig.email.maxLength),
    })
    .refine((value) => value.trim() === value, {
      message: errorMessages.email.noSpaces,
    }),

  password: z
    .string()
    .min(userAuthConfig.password.minLength, {
      message: errorMessages.password.minLength(
        userAuthConfig.password.minLength,
      ),
    })
    .max(userAuthConfig.password.maxLength, {
      message: errorMessages.password.maxLength(
        userAuthConfig.password.maxLength,
      ),
    })
    .regex(userAuthConfig.password.hasLowerCase, {
      message: errorMessages.password.hasLowerCase,
    })
    .regex(userAuthConfig.password.hasUpperCase, {
      message: errorMessages.password.hasUpperCase,
    })
    .regex(userAuthConfig.password.hasNumber, {
      message: errorMessages.password.hasNumber,
    })
    .regex(userAuthConfig.password.hasSpecialChar, {
      message: errorMessages.password.hasSpecialChar,
    })
    .refine((value) => value.trim() === value, {
      message: errorMessages.password.noSpaces,
    }),
});
