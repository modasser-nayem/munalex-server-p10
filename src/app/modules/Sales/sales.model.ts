import { Schema, model } from "mongoose";
import { TSale } from "./sales.interface";

const salesSchema = new Schema<TSale>({
  productId: {
    type: Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
  buyer: {
    type: String,
  },
  date: {
    type: Date,
  },
});

export const Sales = model<TSale>("Sale", salesSchema);
