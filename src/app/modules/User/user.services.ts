import config from "../../config";
import AppError from "../../error/AppError";
import { TLoginUser, TUser } from "./user.interface";
import User from "./user.model";
import { createAccessToken, isPasswordMatch } from "./user.utils";

const registerUserIntoDB = async (data: TUser) => {
  if (await User.findOne({ email: data.email })) {
    throw new AppError(400, `The Email address is Already exist!`);
  }
  await User.create(data);

  return null;
};

const loginUserFromDB = async (data: TLoginUser) => {
  const user = await User.findOne({ email: data.email });

  // check user is exist
  if (!user) {
    throw new AppError(400, "User not exist!");
  }

  // check password is match
  if (!(await isPasswordMatch(data.password, user.password))) {
    throw new AppError(400, "Password does not match!");
  }

  // generate accessToken
  const jwtAccessPayload = { id: user.id, role: user.role as string };
  const token = createAccessToken(
    jwtAccessPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { access_token: token };
};

const getMeIntoDB = async (userId: string) => {
  const user = await User.findById(userId, {
    password: 0,
    __v: 0,
  });
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  return user;
};

const userServices = { registerUserIntoDB, loginUserFromDB, getMeIntoDB };
export default userServices;
