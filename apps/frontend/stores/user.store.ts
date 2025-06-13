import { create } from "zustand";
import { TUser } from "@shared/types";

interface UserStore {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => set({ user: null }),
}));
