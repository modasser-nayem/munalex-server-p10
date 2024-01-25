import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { hashPassword } from "../../utils/passwordHandler";
import config from "../../config";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = model<TUser>("User", userSchema);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await hashPassword(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export default User;
