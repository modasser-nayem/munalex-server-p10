import { z } from "zod";
import { isEmptyString } from "../../utils/zodValidation";

const productCreateValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: "Name is required" })
        .min(4, { message: "Name must be grater than 4 character" }),
      price: z
        .number({ required_error: "Price is required" })
        .min(0, { message: "Price can't be a negative number" }),
      quantity: z
        .number({ required_error: "Price is required" })
        .min(1, { message: "Quantity can't be 0 or negative number" }),
      releaseDate: z.date({
        invalid_type_error: "Release date must be a date",
      }),
      model: z
        .string({ required_error: "Model is required" })
        .refine((value) => isEmptyString(value), {
          message: "Please provide product model",
        }),
      brand: z
        .string({ required_error: "Brand is required" })
        .refine((value) => isEmptyString(value), {
          message: "Please provide product brand",
        }),
      category: z
        .string({ required_error: "Category is required" })
        .refine((value) => isEmptyString(value), {
          message: "Please provide category",
        }),
      image: z
        .string({ required_error: "Image is required" })
        .refine((value) => isEmptyString(value), {
          message: "Please provide image",
        }),
      specification: z.array(
        z.object({
          name: z.string(),
          options: z.record(z.string()),
        }),
      ),
    })
    .refine((data) => data.specification.length! > 2, {
      message:
        "Please provide minimum 2 product specification like Connectivity, Features etc.",
      path: ["specification"],
    }),
});

const productUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(4, { message: "Name must be grater than 4 character" })
      .optional(),
    price: z
      .number()
      .min(0, { message: "Price can't be a negative number" })
      .optional(),
    quantity: z
      .number()
      .min(1, { message: "Quantity can't be 0 or negative number" })
      .optional(),
    releaseDate: z
      .date({
        invalid_type_error: "Release date must be a date",
      })
      .optional(),
    model: z
      .string()
      .refine((value) => isEmptyString(value), {
        message: "Please provide product model",
      })
      .optional(),
    brand: z
      .string()
      .refine((value) => isEmptyString(value), {
        message: "Please provide product brand",
      })
      .optional(),
    category: z
      .string()
      .refine((value) => isEmptyString(value), {
        message: "Please provide category",
      })
      .optional(),
    image: z
      .string()
      .refine((value) => isEmptyString(value), {
        message: "Please provide image",
      })
      .optional(),
    specification: z
      .array(
        z.object({
          name: z.string(),
          options: z.record(z.string()),
        }),
      )
      .optional(),
  }),
});

export const productValidationSchemas = {
  productCreateValidationSchema,
  productUpdateValidationSchema,
};
