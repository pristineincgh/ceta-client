import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  CHANGE_USER_PASSWORD,
  LOGIN_USER,
  RESEND_PASSWORD_RESET_EMAIL,
  RESET_USER_PASSWORD,
  UPDATE_MY_PROFILE,
} from "./auth_endpoints";
import { createSession } from "@/actions/auth-actions";
import { useAuthStore } from "@/store/authStore";

export const useLoginUser = () => {
  const router = useRouter();
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: LOGIN_USER,
    onSuccess: async (data) => {
      try {
        await createSession(data);
        setSession(data);

        // redirect based on user role
        if (data.user.role === "admin" || data.user.role === "superadmin") {
          router.push("/admin");
        } else {
          router.push("/agent");
        }

        toast.success("Login successful");
      } catch (error) {
        toast.error("Failed to login");
        console.log("Error creating session:", error);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);

        const shouldResetPassword =
          error.response.headers["x-password-reset"] === "true";

        if (shouldResetPassword) {
          router.push("/reset-password");
        }
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });
};

export const useResetUserPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: RESET_USER_PASSWORD,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });
};

export const useResendPasswordResetEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: RESEND_PASSWORD_RESET_EMAIL,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/resend-success");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });
};

export const useUpdateMyProfile = () => {
  const { updateProfile } = useAuthStore();

  return useMutation({
    mutationFn: UPDATE_MY_PROFILE,
    onSuccess: (updated_user) => {
      toast.success("Profile updated successfully");
      updateProfile(updated_user);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });
};

export const useChangeMyPassword = () => {
  return useMutation({
    mutationFn: CHANGE_USER_PASSWORD,
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });
};
