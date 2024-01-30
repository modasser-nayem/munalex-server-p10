import { Query, Schema, model } from "mongoose";
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
      type: String,
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
    features: {},
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

// filter out deleted documents
productSchema.pre<Query<TProduct, TProduct>>(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// create index
productSchema.index({ name: "text" });

export const Product = model<TProduct>("Product", productSchema);
