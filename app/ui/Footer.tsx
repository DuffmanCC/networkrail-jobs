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
    <footer className="fixed w-full z-20 bg-white bottom-0 text-black border-t">
      <div className="container mx-auto flex justify-center items-center py-2 px-4">
        Made with ❤️ by DuffmanCC
      </div>

      <Card className="absolute z-10 bottom-8 rounded-full px-8 py-4 bg-black text-white hidden">
        {JSON.stringify(obj)}
      </Card>
    </footer>
  );
}
