import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../error/AppError";
import User from "../modules/User/user.model";
import { verifyAccessToken } from "../modules/User/user.utils";
import catchAsync from "../utils/catchAsync";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Unauthorize access");
    }

    const decode = (await verifyAccessToken(
      token,
      config.jwt_access_secret as string,
    )) as JwtPayload;

    if (!(await User.findById(decode.id))) {
      throw new AppError(401, "Unauthorize access");
    }

    req.user = decode;
    next();
  });
};

export default auth;
