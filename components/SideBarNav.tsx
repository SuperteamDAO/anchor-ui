"use client";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { link } from "fs";

export type NavItems = {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

type SideBarNavProps = {
  items: NavItems[];
};

export function SideBarNav({ items }: SideBarNavProps) {
  return (
    <div className="flex flex-col gap-4 py-2 ">
      <nav className="grid gap-2 px-2 justify-items-center ">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={cn(
              buttonVariants({ variant: item.variant, size: "sm" }),
              item.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "w-full justify-start "
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
