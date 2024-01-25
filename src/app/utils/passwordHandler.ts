import bcrypt from "bcrypt";

export const hashPassword = async (
  plainTextPassword: string,
  saltRounds: number,
) => {
  return await bcrypt.hash(plainTextPassword, saltRounds);
};

export const isPasswordMatch = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
