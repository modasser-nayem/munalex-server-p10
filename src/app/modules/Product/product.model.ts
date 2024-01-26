import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

// product model
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    ReleaseDate: {
      type: Date,
    },
    model: {
      type: String,
      unique: true,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>("Product", productSchema);

// sale model
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
