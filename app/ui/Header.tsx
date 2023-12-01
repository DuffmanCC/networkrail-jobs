"use client";

import { Link, Switch } from "@nextui-org/react";
import { useEffect } from "react";
import useStore from "../store";
import { FilterIcon, HomeIcon, MapIcon, MoonIcon, SunIcon } from "./Icons";

export default function Header() {
  const showFilters = useStore((state: any) => state.showFilters);
  const showMap = useStore((state: any) => state.showMap);
  const isDarkMode = useStore((state: any) => state.isDarkMode);

  function handleToggleFilters() {
    useStore.setState({ showFilters: !showFilters });
  }

  function handleToggleMap() {
    useStore.setState({ showMap: !showMap });
  }

  function handleTooggleDarkMode() {
    useStore.setState({ isDarkMode: !isDarkMode });
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

  return (
    <header className="fixed w-full z-20 bg-white text-black border-b">
      <div className="container mx-auto flex justify-between items-center py-2 px-2">
        <div className="flex gap-2">
          <Link href="/" aria-label="home">
            <HomeIcon className="w-6 h-6 text-gray-400" />
          </Link>

          <button
            onClick={handleToggleFilters}
            aria-label="filter toggle button"
          >
            <FilterIcon className="w-6 h-6 text-gray-400" />
          </button>

          <button onClick={handleToggleMap} aria-label="map toggle button">
            <MapIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <Switch
          aria-label="dark mode toggle"
          onValueChange={handleTooggleDarkMode}
          defaultSelected
          size="sm"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        />
      </div>
    </header>
  );
}
