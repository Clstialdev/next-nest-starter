import { create } from "zustand";
import { useUserStore } from "@/stores/user.store";

type AuthResponse = {
  status: string;
  message: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<AuthResponse>;
  login: ({ email, password }: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  checkAuth: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
        {
          credentials: "include",
        }
      );
      // if not authenticated, throw error
      if (!res.ok || res.status !== 200) {
        set({ isAuthenticated: false, isLoading: false });
        return {
          status: "KO",
          message: "Not Authenticated",
        };
      }
      // else set user
      const jwtData = await res.json();
      const userData = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${jwtData.userId}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json());
      useUserStore.getState().setUser(userData[0]);
      set({ isAuthenticated: true, isLoading: false });
      return { status: "OK", message: "Authenticated" };
    } catch (err) {
      console.error(err);
      // On failure, clear user data and set auth to false
      useUserStore.getState().clearUser();
      set({ isAuthenticated: false, isLoading: false });
      return { status: "KO", message: "Not Authenticated" };
    }
  },
  login: async ({ email, password }: LoginCredentials) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      // if not authenticated, throw error
      if (!res.ok || res.status !== 201) {
        set({ isAuthenticated: false, isLoading: false });
        return { status: "KO", message: "Email or Password incorrect" };
      }
      const { user } = await res.json();
      useUserStore.getState().setUser(user);
      set({ isAuthenticated: true, isLoading: false });
      return { status: "OK", message: "Logged in" };
    } catch (e) {
      console.error(e);
      set({ isAuthenticated: false, isLoading: false });
      return { status: "KO", message: "Login Failed" };
    }
  },
  logout: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      // if not authenticated, throw error
      if (!res.ok || res.status !== 200) {
        set({ isAuthenticated: false, isLoading: false });
        return { status: "KO", message: "Logout Failed" };
      }
      useUserStore.getState().clearUser();
      set({ isAuthenticated: false, isLoading: false });
      return { status: "OK", message: "Logged out" };
    } catch (e) {
      console.error(e);
      set({ isAuthenticated: false, isLoading: false });
      return { status: "KO", message: "Logout Failed" };
    }
  },
}));

useAuthStore.getState().checkAuth();
