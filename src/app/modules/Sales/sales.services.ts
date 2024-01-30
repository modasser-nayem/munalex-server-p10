import mongoose from "mongoose";
import { TSale } from "./sales.interface";
import { Sales } from "./sales.model";
import { Product } from "../Product/product.model";
import AppError from "../../error/AppError";
import { dateRangeCategory, getDateRange } from "../../utils/generateDateRange";

const saleProductIntoDB = async (productId: string, data: TSale) => {
  data.productId = new mongoose.Types.ObjectId(productId);
  data.date = new Date(data.date).toISOString();
  const product = await Product.findById(data.productId);
  if (!product) {
    throw new AppError(404, "Product not found!");
  }
  if (product.quantity < data.quantity) {
    throw new AppError(
      400,
      `Currently ${product.quantity} product available. You cant't sell ${data.quantity} product`,
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction({ maxTimeMS: 60000 });

    const newQuantity = product.quantity - data.quantity;
    if (newQuantity === 0) {
      await Product.findByIdAndUpdate(
        productId,
        {
          $set: { quantity: newQuantity, isDeleted: true },
        },
        { new: true, session: session },
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $set: { quantity: newQuantity },
        },
        { new: true, session: session },
      );
    }

    // create sale
    const result = new Sales(data);

    await result.save({ session: session });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Product sale failed!, try again");
  }
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
const getSalesHistoryFromDB = async (query: Record<string, any>) => {
  const category = query.category || dateRangeCategory.weekly;

  const dateRange = getDateRange(category);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dateRangeFilter: Record<string, any> = {};

  if (dateRange) {
    dateRangeFilter.date = {
      $gte: dateRange?.startDate,
      $lte: dateRange?.endDate,
    } || {
      $exists: true,
    };
  }

  const filter = { ...dateRangeFilter };

  const result = await Sales.find(filter);
  return result;
};

const getAllSalesFromDB = async () => {
  const result = await Sales.find();
  return result;
};

const salesServices = {
  saleProductIntoDB,
  getSalesHistoryFromDB,
  getAllSalesFromDB,
};
export default salesServices;
