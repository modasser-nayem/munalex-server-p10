import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// hash password
export const hashPassword = async (
  plainTextPassword: string,
  saltRounds: number,
) => {
  return await bcrypt.hash(plainTextPassword, saltRounds);
};

// Match hash password
export const isPasswordMatch = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Generate accessToken
type TJwtPayload = {
  id: string;
  role: string;
};

export const createAccessToken = (
  payload: TJwtPayload,
  access_secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, access_secret, { expiresIn });
};

export const verifyAccessToken = async (
  token: string,
  access_secret: string,
) => {
  return jwt.verify(token, access_secret);
};
