import React from "react";
import { Button } from "./ui/button";
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

export type NavItems = {
  title: string;
  href: string;
  icon: LucideIcon;
};

type SideBarNavProps = {
  items: NavItems[];
};

function V1SidebarNav({ items }: SideBarNavProps) {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          {/* //logo */}
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {items.map((item, idx) => {
          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg "
                    aria-label="Playground"
                  >
                    <item.icon className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg bg-muted"
              aria-label="Playground"
            >
              <Triangle className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Playground
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Help"
            >
              <LifeBuoy className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Account"
            >
              <SquareUser className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

export default V1SidebarNav;
