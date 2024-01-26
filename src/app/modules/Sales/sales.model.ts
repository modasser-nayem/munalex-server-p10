import { Schema, model } from "mongoose";
import { TSale } from "./sales.interface";

const saleSchema = new Schema<TSale>({
  productId: {
    type: Schema.ObjectId,
    ref: "Brand",
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

export const Sale = model<TSale>("Sale", saleSchema);
