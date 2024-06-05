import React from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
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
                    item.variant === "default" &&
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
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <img src="/badge.svg" alt="SuperTeam Badge" />
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
