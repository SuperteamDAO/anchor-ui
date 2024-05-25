"use client";

import { Providers } from "@/providers/Providers";
import { Toaster } from "./ui/toaster";
import { NavItems, SideBarNav } from "./SideBarNav";
import {
  Braces,
  BookA,
  Activity,
  CircuitBoard,
  Database,
  ChevronRightSquare,
} from "lucide-react";

import V1SidebarNav from "./V1SidebarNav";
import Header from "./Header";

const navItems: NavItems[] = [
  {
    href: "/",
    title: "IDL",

    icon: Braces,
  },
  {
    href: "/accounts",
    title: "Accounts",

    icon: Database,
  },
  {
    href: "/instructions",
    title: "Instructions",

    icon: ChevronRightSquare,
  },
  {
    href: "/transactions",
    title: "Transactions",

    icon: CircuitBoard,
  },
];

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="grid h-screen w-full pl-[56px]">
        <V1SidebarNav items={navItems} />
        <div className="flex flex-col">
          <Header />
          <main className="grid flex-1 gap-4 overflow-auto overscroll-none p-4 bg-muted/40 ">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </Providers>
  );
}
