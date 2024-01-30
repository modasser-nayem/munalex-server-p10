import { z } from "zod";
import { isEmptyString } from "../../utils/zodValidation";

const saleProductValidationSchema = z.object({
  body: z.object({
    quantity: z
      .number({ required_error: "Quantity is required" })
      .min(1, { message: "Quantity can't be 0 or negative number" }),
    buyer: z
      .string({ required_error: "Buyer name is required" })
      .min(4, { message: "Buyer name must be grater than 4 character" }),
    date: z
      .string({ required_error: "Sale Date is required" })
      .refine((value) => isEmptyString(value), {
        message: "Please provide sale date",
      }),
  }),
});

const salesValidationSchemas = { saleProductValidationSchema };
export default salesValidationSchemas;
