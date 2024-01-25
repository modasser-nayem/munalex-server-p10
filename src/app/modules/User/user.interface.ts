type TUserRole = "user";

export interface TUser {
  name: string;
  email: string;
  password: string;
  photo?: string;
  role?: TUserRole;
}

export type TLoginUser = {
  email: string;
  password: string;
};
