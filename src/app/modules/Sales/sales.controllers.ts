import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import salesServices from "./sales.services";

const saleProduct = catchAsync(async (req, res) => {
  const result = await salesServices.saleProductIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product is successfully selling",
    data: result,
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const result = await salesServices.getSalesHistoryFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Sales History",
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await salesServices.getAllSalesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All sales retrieved successfully",
    data: result,
  });
});

const salesControllers = { saleProduct, getSalesHistory, getAllSales };
export default salesControllers;
