import { Types } from "mongoose";

export type TSale = {
  productId: Types.ObjectId;
  quantity: number;
  buyer: string;
  date: string;
};
