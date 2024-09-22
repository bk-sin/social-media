import { UserDataAuthenticated } from "@/modules/users/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  user: UserDataAuthenticated | null;
  setUser: (user: UserDataAuthenticated | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
