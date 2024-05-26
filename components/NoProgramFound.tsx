import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

function NoProgramFound() {
  return (
    <div className="flex min-h-[89vh]  w-full  flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have not added any Programs yet
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start adding programs by clicking the `&quot;Add
          Program`&quot; button below.
        </p>
        <Link href="/">
          <Button className="mt-4">Add Program</Button>
        </Link>
      </div>
    </div>
  );
}

export default NoProgramFound;
