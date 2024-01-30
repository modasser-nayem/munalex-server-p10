import { z } from "zod";
import { isEmptyString } from "../../utils/zodValidation";

const productCreateValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(4, { message: "Name must be grater than 4 character" }),
    price: z
      .number({ required_error: "Price is required" })
      .min(0, { message: "Price can't be a negative number" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .min(1, { message: "Quantity can't be 0 or negative number" }),
    releaseDate: z
      .string({ required_error: "Release Date is required" })
      .refine((value) => isEmptyString(value), {
        message: "Please provide release date",
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
    operatingSystem: z.string().optional(),
    connectivity: z
      .array(z.string(), {
        required_error:
          "Please provide connectivity (e.g., Bluetooth, Wi-Fi, USB-C)",
      })
      .refine((data) => data.length > 0, {
        message: "Please provide product connectivity",
      }),
    powerSource: z
      .string({
        required_error: "Please provide product power source",
      })
      .refine((value) => isEmptyString(value), {
        message: "Please provide power source (e.g., battery-powered, plug-in)",
      }),
    features: z
      .record(
        z.string({
          invalid_type_error:
            "Provide key value faire data, key and value always string",
        }),
        {
          required_error: "Product features is required",
        },
      )
      .refine((value) => Object.keys(value).length !== 0, {
        message:
          "Please provide relevant product specifications features like (e.g camera resolution, storage capacity)",
      }),
    image: z
      .string({ required_error: "Image is required" })
      .refine((value) => isEmptyString(value), {
        message: "Please provide image",
      }),
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
      .string()
      .datetime({ message: "Release date must be a date" })
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
    operatingSystem: z.string().optional(),
    connectivity: z.array(z.string()).optional(),
    powerSource: z.string().optional(),
    features: z.record(z.string()).optional(),
    image: z
      .string()
      .refine((value) => isEmptyString(value), {
        message: "Please provide image",
      })
      .optional(),
  }),
});

export const productValidationSchemas = {
  productCreateValidationSchema,
  productUpdateValidationSchema,
};
