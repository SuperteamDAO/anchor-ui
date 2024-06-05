"use client";
import { Button } from "@/components/ui/button";
import { useProgramsListStore } from "@/hooks/useProgramsList";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useCurrentProgramStore } from "@/hooks/useCurrentProgram";
import { Program } from "@coral-xyz/anchor";

export default function Home() {
  const { programs, addProgram, removeProgram } = useProgramsListStore();
  const currentProgram = useCurrentProgramStore((state) => state.program);
  const removeCurrentProgram = useCurrentProgramStore(
    (state) => state.removeProgram
  );

  const router = useRouter();

  const removeProgramHandler = (program: Program) => {
    removeProgram(program);
    if (currentProgram?.programId === program.programId) {
      removeCurrentProgram();
    }
  };

  return (
    <main className="flex h-full min-h-[89vh] w-full flex-col  items-center">
      {programs.length === 0 && (
        <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Start by adding your program
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start interacting with your programs as soon as you add
              the IDL.
            </p>
            <Link href="/add-program">
              <Button className="mt-4">Add Program</Button>
            </Link>
          </div>
        </div>
      )}
      {programs.length > 0 && (
        <div className="flex flex-col w-full flex-1 container gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Your Programs!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all your programs u can interact with!
            </p>
          </div>
          <div className="">
            <Table className="w-4/6 bg-black rounded-md p-4 ">
              <TableHeader>
                <TableRow>
                  <TableHead>Program ID</TableHead>
                  <TableHead>Program Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program.programId.toString()}>
                    <TableCell>{program.programId.toString()}</TableCell>
                    <TableCell>{program.rawIdl.metadata.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 items-center justify-end">
                        <Button
                          onClick={() =>
                            router.push(`/edit-program/${program.programId}`)
                          }
                          variant={"secondary"}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            removeProgram(program);
                          }}
                          variant={"destructive"}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </main>
  );
}
