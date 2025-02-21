import { SessionSchema } from "@/types/auth_types";
import { User } from "@/types/user_types";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TokenUpdate {
  accessToken: string;
  refreshToken: string;
}

interface AuthActions {
  setSession: (session: SessionSchema | null) => Promise<void>;
  updateTokens: (tokens: TokenUpdate) => Promise<void>;
  updateProfile: (userData: User) => Promise<void>;
  clearSession: () => Promise<void>;
}

interface AuthStore extends AuthActions {
  session: SessionSchema | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: async (session) => {
        set({ session });
      },
      updateTokens: async (tokens) => {
        set((state) => ({
          session: {
            ...state.session!,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        }));
      },
      updateProfile: async (userData) => {
        set((state) => ({
          session: {
            ...state.session!,
            user: userData,
          },
        }));
      },
      clearSession: async () => {
        set({ session: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
