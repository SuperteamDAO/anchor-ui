"use client";

import { Providers } from "@/providers/Providers";
import Header from "./Header";

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Providers>
        <div className="flex flex-col w-full min-h-full">
          <Header />
          {children}
        </div>
      </Providers>
    </div>
  );
}
