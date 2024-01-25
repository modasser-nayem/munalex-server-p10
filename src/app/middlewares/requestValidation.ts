import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const requestValidate = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};

export default requestValidate;
