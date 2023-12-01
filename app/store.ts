import { create } from "zustand";

const useStore = create(() => ({
  showFilters: true,
  showMap: false,
  isDarkMode: false,
}));

export default useStore;
