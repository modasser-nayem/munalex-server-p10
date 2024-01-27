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
    operatingSystem: {
      type: String,
    },
    connectivity: {
      type: ["String"],
    },
    powerSource: {
      type: String,
    },
    features: {
      type: {
        type: "String",
      },
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>("Product", productSchema);
