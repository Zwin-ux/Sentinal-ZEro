import { create } from "zustand";

const useStore = create((set) => ({
  selectedRegion: "tokyo",
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  user: null,
  setUser: (user) => set({ user }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));

export default useStore;
