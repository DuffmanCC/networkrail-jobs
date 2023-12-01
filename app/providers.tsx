// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="grid grid-rows-body grid-cols-body h-screen gap-2 max-w-[1536px] mx-auto p-2 rounded-lg">
      {children}
    </NextUIProvider>
  );
}
