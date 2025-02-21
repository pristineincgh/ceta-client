import { User } from "./user_types";

// create enum for role
export enum Role {
  AGENT = "agent",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export interface SessionSchema {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequestInput {
  username: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordInput {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
