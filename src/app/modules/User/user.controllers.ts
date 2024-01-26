import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.services";

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User is successfully Registered",
    data: result,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is successfully Logged in",
    data: result,
  });
});

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.getMeIntoDB(req.user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My profile retrieved successfully",
    data: result,
  });
});

const userControllers = { registerUser, loginUser, getMe };
export default userControllers;
