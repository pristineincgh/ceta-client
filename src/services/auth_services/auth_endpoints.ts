import createAxiosInstance from "@/lib/axios-utils";
import {
  ChangePasswordInput,
  LoginRequestInput,
  ResetPasswordInput,
  SessionSchema,
} from "@/types/auth_types";
import { UserUpdateInput } from "@/types/user_types";

const client = createAxiosInstance(false);
const authClient = createAxiosInstance();

export const LOGIN_USER = async (credentials: LoginRequestInput) => {
  const response = await client.post("/auth/login", credentials);

  const { access_token, refresh_token, user } = response.data;

  const userData = {
    accessToken: access_token,
    refreshToken: refresh_token,
    user,
  } as SessionSchema;

  return userData;
};

// * This is the endpoint for resetting a user's password at login
export const RESET_USER_PASSWORD = async (credentials: ResetPasswordInput) => {
  const response = await client.post("/auth/reset-password", {
    token: credentials.token,
    new_password: credentials.password,
  });

  return response.data;
};

// * This is the endpoint for resending a password reset email at login
export const RESEND_PASSWORD_RESET_EMAIL = async (token: string) => {
  const response = await client.post("/auth/resend-reset-password", { token });

  return response.data;
};

export const UPDATE_MY_PROFILE = async (user_data: UserUpdateInput) => {
  const response = await authClient.patch("/users/me", user_data);

  return response.data;
};

export const CHANGE_USER_PASSWORD = async (
  password_data: ChangePasswordInput
) => {
  const response = await authClient.put<{ message: string }>(
    "/users/me/change-password",
    password_data
  );

  return response.data.message;
};
