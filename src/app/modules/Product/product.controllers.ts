import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import productServices from "./product.services";

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product is created successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await productServices.updateProductIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is updated successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await productServices.getAllProductFromDB(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieve successfully",
    data: result,
  });
});

const getProductsFilteringDynamicData = catchAsync(async (req, res) => {
  const result = await productServices.getProductsFilteringDynamicDataIntoDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products filtering dynamic data retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await productServices.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrieve successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await productServices.deleteProductIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is deleted!",
    data: result,
  });
});

const productControllers = {
  createProduct,
  updateProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  getProductsFilteringDynamicData,
};
export default productControllers;
