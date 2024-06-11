import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SendHorizontal } from "lucide-react";

export const AddBtn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden font-medium transition duration-300 ease-out border shadow group",
        // light mode
        "border-zinc-300 text-zinc-800 bg-zinc-50",
        // dark mode
        "dark:border-zinc-700 dark:text-zinc-100 dark:bg-zinc-950"
      )}
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-500 -translate-x-full group-hover:translate-x-0 ease-out bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800">
        <SendHorizontal className="w-20" />
      </span>
      <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </Button>
  );
};
