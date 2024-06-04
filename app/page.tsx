"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useCurrentProgramStore } from "@/hooks/useCurrentProgram";
import { useClusterStore } from "@/hooks/useClusterStore";
import * as anchor from "@coral-xyz/anchor";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { json } from "@codemirror/lang-json";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { formatJsonata } from "@stedi/prettier-plugin-jsonata/dist/lib";
import { useProgramsListStore } from "@/hooks/useProgramsList";
import Link from "next/link";

export default function Home() {
  const { programs, addProgram, removeProgram } = useProgramsListStore();
  console.log("programs", programs);
  return (
    <main className="flex h-full min-h-[89vh] w-full flex-col  items-center">
      <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Start by adding your program
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start interacting with your programs as soon as you add the
            IDL.
          </p>
          <Link href="/add-program">
            <Button className="mt-4">Add Program</Button>
          </Link>
          {programs.map((program) => {
            return (
              <div key={program.programId.toString()}>
                {program.programId.toString()}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
