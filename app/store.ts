import { create } from "zustand";

const useStore = create(() => ({
  showFilters: true,
  isDarkMode: false,
}));

export default useStore;
