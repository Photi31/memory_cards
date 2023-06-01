import { instance } from "common/api/common.api";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  me: () => {
    return instance.post<ProfileType>("auth/me");
  },
  logout: () => {
    return instance.delete<ResponseDeleteType>("auth/me");
  },
  forgotPassword: (arg: ArgForgotType) => {
    return instance.post<ResponseDeleteType>("auth/forgot", arg);
  },
  setNewPassword: (arg: ArgSetPasswordType) => {
    return instance.post<ResponseDeleteType>("auth/set-new-password", arg);
  },
  setName: (arg: ArgSetNameType) => {
    return instance.put<SetNameResponseType>("auth/me", arg);
  },
};

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};
export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
};
export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">;
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type ResponseDeleteType = {
  info?: string;
  error?: string;
};
export type ArgForgotType = {
  email: string;
  form?: string;
  message: string;
};
export type ArgSetPasswordType = {
  password: string;
  resetPasswordToken: string;
};
export type ArgSetNameType = {
  name?: string;
  avatar?: string;
};
export type SetNameResponseType = {
  updatedUser: ProfileType;
  token: string;
  tokenDeathTime: number;
};
