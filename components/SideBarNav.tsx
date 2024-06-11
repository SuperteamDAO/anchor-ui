import React from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  LucideIcon,
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
import { cn } from "@/lib/utils";
import ProgramSwitcher from "./ProgramSwitcher";
import { usePathname } from "next/navigation";
import { clusterName, useClusterStore } from "@/hooks/useClusterStore";

export type NavItems = {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

type SideBarNavProps = {
  items: NavItems[];
};

function SidebarNav({ items }: SideBarNavProps) {
  const pathname = usePathname();
  const { cluster } = useClusterStore();
  const clusterDisplayName = clusterName(cluster);
  return (
    <aside className="inset-y w-[200px]  fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <ProgramSwitcher />
      </div>
      <nav className="grid gap-1.5 py-1 px-2 w-full mt-4">
        {items.map((item, idx) => {
          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: item.variant, size: "sm" }),
                    pathname === item.href &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start w-full"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <p className="leading-7 ">{item.title}</p>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
      {/* good to have feature is to allow a user to click this and change the cluster */}
      <nav className="mt-auto grid gap-4 p-2">
        <div className="py-3 px-5 border border-gray-800 rounded-2xl flex flex-row items-center bg-black shadow-md hover:bg-gray-800 transition duration-300 ease-in-out">
          <span className=" h-3 w-3 animate-ping absolute inline-flex rounded-full bg-purple-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          <span className="text-base pl-2 ">{clusterDisplayName}</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://superteam.fun" target="_blank">
              <Image
                src="/badge.svg"
                alt="SuperTeam Badge"
                width={400}
                height={40}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Superteam
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

// export default SidebarNav;

export function SideBarNewNav({ links }: { links: NavItems[] }) {
  const pathname = usePathname();
  return (
    <div
      data-collapsed={false}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          false ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.title && (
                  <span className="ml-auto text-muted-foreground">
                    {link.title}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.title && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.title}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}

export default SidebarNav;
