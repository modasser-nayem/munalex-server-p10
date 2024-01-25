import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is successfully Register",
    data: "result",
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is successfully Logged in",
    data: "result",
  });
});

const getMe: RequestHandler = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My profile retrieved successfully",
    data: "result",
  });
});

const userControllers = { registerUser, loginUser, getMe };
export default userControllers;
