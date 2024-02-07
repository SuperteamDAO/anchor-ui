"use client";

import { Providers } from "@/providers/Providers";
import Header from "./Header";
import { Toaster } from "./ui/toaster";

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Providers>
        <div className="flex flex-col w-full min-h-full">
          <Header />
          {children}
        </div>
        <Toaster />
      </Providers>
    </div>
  );
}
