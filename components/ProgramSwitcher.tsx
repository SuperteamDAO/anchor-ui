"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentProgramStore } from "@/hooks/useCurrentProgram";
import { useProgramsListStore } from "@/hooks/useProgramsList";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function ProgramSwitcher() {
  const programs = useProgramsListStore((state) => state.programs);
  const currentProgram = useCurrentProgramStore((state) => state.program);
  const router = useRouter();
  const programsExcludingCurrent = programs.filter(
    (p) => p.programId !== currentProgram?.programId
  );

  const onValueChangeHandler = () => {};

  if (!currentProgram || programs.length === 0) {
    return (
      <Button
        className="w-full"
        variant={"outline"}
        onClick={() => router.push("/add-program")}
      >
        Add Program
      </Button>
    );
  }

  return (
    <Select
      defaultValue={currentProgram?.programId.toString()}
      onValueChange={onValueChangeHandler}
    >
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        )}
        aria-label="Select Program"
      >
        <SelectValue placeholder="Select Program">
          <span className="font-semibold">
            {" "}
            {currentProgram?.rawIdl.metadata.name ?? "No Program name "}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Programs</SelectLabel>
          {programsExcludingCurrent.length !== 0 ? (
            programsExcludingCurrent.map((p) => {
              return (
                <SelectItem
                  key={p.programId.toString()}
                  value={p.programId.toString()}
                >
                  {p.rawIdl.metadata.name}
                </SelectItem>
              );
            })
          ) : (
            <SelectItem value="no-programs" disabled>
              No Programs Found
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ProgramSwitcher;
