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
    releaseDate: {
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
    image: {
      type: String,
    },
    specification: {
      type: [
        {
          name: String,
          options: {},
        },
      ],
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>("Product", productSchema);
