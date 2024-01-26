import { z } from "zod";
import { isEmptyString } from "../../utils/zodValidation";

const userRegisterValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: "Name is required" })
        .min(4, { message: "Name must be grater than 4 character" })
        .max(30, { message: "Name can't be more than 30 character" }),
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        }),
      confirmPassword: z.string({
        required_error: "Confirm Password is required",
      }),
      photo: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" })
      .refine((value) => isEmptyString(value), {
        message: "Please provide your email address",
      }),
    password: z
      .string({ required_error: "Password is required" })
      .refine((value) => isEmptyString(value), {
        message: "Please provide your password",
      }),
  }),
});

export const userValidationSchemas = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
};
