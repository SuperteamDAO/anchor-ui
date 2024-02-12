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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
    <div className="w-screen overflow-x-hidden h-screen overflow-hidden">
      <Providers>
        <div className="flex flex-col w-full ">
          <Header />
          <ResizablePanelGroup
            direction="horizontal"
            className=" items-stretch border"
          >
            <ResizablePanel minSize={10} maxSize={15} defaultSize={15}>
              <SideBarNav items={navItems} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="w-full">{children}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <Toaster />
      </Providers>
    </div>
  );
}
