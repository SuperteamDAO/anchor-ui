"use client";

import { Providers } from "@/providers/Providers";
import { Toaster } from "./ui/toaster";

import {
  Braces,
  BookA,
  Activity,
  CircuitBoard,
  Database,
  ChevronRightSquare,
} from "lucide-react";

import SideBarNav, { NavItems } from "./SideBarNav";
import Header from "./Header";

const navItems: NavItems[] = [
  {
    href: "/",
    title: "Programs",
    variant: "ghost",
    icon: Braces,
  },
  {
    href: "/accounts",
    title: "Accounts",
    variant: "ghost",
    icon: Database,
  },
  {
    href: "/instructions",
    title: "Instructions",
    variant: "ghost",
    icon: ChevronRightSquare,
  },
  {
    href: "/transactions",
    variant: "ghost",
    title: "Transactions",
    icon: CircuitBoard,
  },
];

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="grid h-screen w-full pl-[200px]">
        <SideBarNav items={navItems} />
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 overflow-hidden p-4 bg-muted/40 h-[calc(100vh-57px)]">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </Providers>
  );
}
