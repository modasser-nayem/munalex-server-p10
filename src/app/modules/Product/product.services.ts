import AppError from "../../error/AppError";
import caseInsensitiveStringGen from "../../utils/caseInsensitiveStringGen";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import mongoose from "mongoose";

// create
const createProductIntoDB = async (data: TProduct) => {
  data.releaseDate = new Date(data.releaseDate.toString());
  if (
    await Product.findOne({
      name: caseInsensitiveStringGen(data.name),
    })
  ) {
    throw new AppError(400, "Product name is already exist");
  }

  //  model check
  if (await Product.findOne({ model: caseInsensitiveStringGen(data.model) })) {
    throw new AppError(400, "Product model is already exist");
  }

  // create product
  const result = await Product.create(data);

  return result;
};

// update
const updateProductIntoDB = async (id: string, data: Partial<TProduct>) => {
  if (data.price) {
    data.price = Number(data.price);
  }
  if (data.quantity) {
    data.quantity = Number(data.quantity);
  }
  if (data?.releaseDate) {
    data.releaseDate = new Date(data.releaseDate.toString());
  }
  if (!(await Product.findById(id))) {
    throw new AppError(404, "Product not found!");
  }

  const { connectivity, features, ...primitiveProductData } = data;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // primitive data update
    if (Object.keys(primitiveProductData)) {
      await Product.findByIdAndUpdate(id, primitiveProductData, {
        new: true,
        runValidators: true,
        session,
      });
    }

    // array data update
    if (connectivity?.length) {
      await Product.findByIdAndUpdate(
        id,
        {
          $set: { connectivity: connectivity },
        },
        { new: true, runValidators: true, session },
      );
    }

    if (features && Object.keys(features).length) {
      await Product.findByIdAndUpdate(
        id,
        { $set: { features: features } },
        { new: true, runValidators: true, session },
      );
    }

    const result = await Product.findById(
      id,
      { isDeleted: 0, __v: 0 },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Product update failed!, try again");
  }
};

// get all
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProductFromDB = async (query: Record<string, any>) => {
  const search = query.search;
  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);
  const releaseDateStart = query.releaseDateStart;
  const releaseDateEnd = query?.releaseDateEnd;
  const brand = query.brand;
  const model = query.model;
  const category = query.category;
  const operatingSystem = query.operatingSystem;
  const connectivity = query.connectivity
    ? query.connectivity.split(",")
    : null;
  const powerSource = query.powerSource ? query.powerSource.toString() : "";
  // const features = query.features ? query.features.toString() : "";

  // =================================

  const searchFilter = search ? { $text: { $search: search } } : {};

  const priceFilter = {
    $gte: minPrice || 0,
    $lte: maxPrice || Number.MAX_VALUE,
  };

  const releaseDateFilter: Record<string, unknown> = {};
  if (releaseDateStart) {
    releaseDateFilter.releaseDate = {
      $gte: new Date(releaseDateStart).toISOString(),
    } || {
      $exists: true,
    };
  }

  if (releaseDateEnd) {
    releaseDateFilter.releaseDate = releaseDateFilter.releaseDate
      ? {
          ...releaseDateFilter.releaseDate,
          $lte: new Date(releaseDateEnd).toISOString(),
        } || {
          $exists: true,
        }
      : {
          $lte: new Date(releaseDateEnd).toISOString(),
        } || {
          $exists: true,
        };
  }

  const brandFilter = brand ? { brand: caseInsensitiveStringGen(brand) } : {};

  const modelFilter = model ? { model: caseInsensitiveStringGen(model) } : {};

  const categoryFilter = category
    ? { category: caseInsensitiveStringGen(category) }
    : {};

  const operatingSystemFilter = operatingSystem
    ? { operatingSystem: caseInsensitiveStringGen(operatingSystem) }
    : {};

  const connectivityFilter = connectivity
    ? {
        connectivity: {
          $in: connectivity.map((item: string) =>
            caseInsensitiveStringGen(item),
          ),
        },
      }
    : {};

  const powerSourceFilter = powerSource
    ? { powerSource: caseInsensitiveStringGen(powerSource) }
    : {};

  const filter = {
    ...searchFilter,
    ...releaseDateFilter,
    ...brandFilter,
    ...modelFilter,
    ...categoryFilter,
    ...operatingSystemFilter,
    ...connectivityFilter,
    ...powerSourceFilter,
    price: priceFilter,
    isDeleted: false,
  };
  // =================================
  const result = await Product.find(filter, {
    isDeleted: 0,
    __v: 0,
    specification: 0,
  });
  return result;
};

// get product filtering data based on all product
const getProductsFilteringDynamicDataIntoDB = async () => {
  const result = await Product.aggregate([
    {
      $group: {
        _id: null,
        models: { $addToSet: "$model" },
        brands: { $addToSet: "$brand" },
        categories: { $addToSet: "$category" },
        connectivity: { $addToSet: "$connectivity" },
        powerSources: { $addToSet: "$powerSource" },
        features: { $mergeObjects: "$features" },
      },
    },
    {
      $project: {
        _id: 0,
        models: 1,
        brands: 1,
        categories: 1,
        powerSources: 1,
        features: 1,
        connectivity: {
          $reduce: {
            input: "$connectivity",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
  ]);

  result[0].connectivity = Array.from(new Set(result[0].connectivity));

  return result[0];
};

// update
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id, { isDeleted: 0, __v: 0 });

  if (!result) {
    throw new AppError(404, "Product not found!");
  }
  return result;
};

// delete
const deleteProductIntoDB = async (id: string) => {
  if (!(await Product.findById(id))) {
    throw new AppError(404, "Product not found!");
  }
  await Product.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const productServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductIntoDB,
  getProductsFilteringDynamicDataIntoDB,
};
export default productServices;
