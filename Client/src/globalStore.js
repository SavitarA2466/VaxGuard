import { create } from "zustand";

const useGlobalStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),
}));

export default useGlobalStore;
