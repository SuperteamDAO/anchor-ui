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

function ProgramSwitcher() {
  const programs = useProgramsListStore((state) => state.programs);
  const program = useCurrentProgramStore((state) => state.program);

  console.log("program sidebar", program);

  const onValueChangeHandler = () => {};

  return (
    <Select
      defaultValue={program?.programId.toString()}
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
            {program?.rawIdl.metadata.name ?? "No Program name "}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ProgramSwitcher;
