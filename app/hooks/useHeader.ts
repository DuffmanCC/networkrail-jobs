import useStore from "@/app/store";
import { useEffect, useState } from "react";

export default function useHeader() {
  const showFilters = useStore((state: any) => state.showFilters);
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const [isExplainLayer, setIsExplainLayer] = useState(false);

  function handleToggleFilters() {
    useStore.setState({ showFilters: !showFilters });
  }

  function handleTooggleDarkMode() {
    useStore.setState({ isDarkMode: !isDarkMode });
  }

  function handleCloseExplainLayer() {
    setIsExplainLayer(false);
  }

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("visited");

    if (isFirstVisit) {
      localStorage.setItem("visited", "true");
      console.log("Welcome! It seems to be your first visit.");

      if (isMobileDevice()) {
        setIsExplainLayer(true);
      }
    }
  }, []);

  return {
    showFilters,
    isDarkMode,
    isExplainLayer,
    handleToggleFilters,
    handleTooggleDarkMode,
    handleCloseExplainLayer,
  };
}
