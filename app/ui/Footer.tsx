"use client";

import { Card } from "@nextui-org/react";
import useStore from "../store";

export default function Footer() {
  const showFilters = useStore((state: any) => state.showFilters);
  const showMap = useStore((state: any) => state.showMap);
  const isDarkMode = useStore((state: any) => state.isDarkMode);

  const obj = {
    showFilters,
    showMap,
    isDarkMode,
  };

  return (
    <Card
      className="sm:col-span-2 bg-slate-200 dark:bg-slate-800"
      id="footer"
      radius="sm"
      shadow="none"
    >
      <footer>
        <div className="flex justify-center items-center py-2 px-4">
          Made with ❤️ by DuffmanCC
        </div>

        <Card
          className="absolute z-10 bottom-8 rounded-full px-8 py-4 bg-black text-white hidden"
          radius="sm"
        >
          {JSON.stringify(obj)}
        </Card>
      </footer>
    </Card>
  );
}
