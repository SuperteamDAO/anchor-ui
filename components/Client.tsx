"use client";

import { Providers } from "@/providers/Providers";
import Header from "./Header";
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
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import V1SidebarNav from "./V1SidebarNav";
import V1Header from "./V1Header";

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
          <V1Header />
          <main className="grid flex-1 gap-4 overflow-auto p-4 bg-muted/40 ">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </Providers>
  );
}
