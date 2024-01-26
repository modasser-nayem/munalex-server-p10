import { TProduct } from "./product.interface";

const createProductIntoDB = async (data: TProduct) => {
  return data;
};

const updateProductIntoDB = async (id: string, data: Partial<TProduct>) => {
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProductFromDB = async (query: Record<string, any>) => {
  return query;
};

const getSingleProductFromDB = async (id: string) => {
  return id;
};
const deleteProductIntoDB = async (id: string) => {
  return id;
};

const productServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductIntoDB,
};
export default productServices;
