"use client";
import { useCurrentProgramStore } from "@/hooks/useCurrentProgram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccountTable from "./_components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NoProgramFound from "@/components/NoProgramFound";

export default function AccountPage() {
  const program = useCurrentProgramStore((state) => state.program);
  const idl = program?.rawIdl;

  return (
    <div className="flex  w-full h-full  flex-col ">
      {idl?.accounts !== undefined && program !== null ? (
        <div className="py-2 px-4">
          <Tabs defaultValue={idl.accounts[0].name} className="w-full">
            <TabsList>
              {idl.accounts.map((account) => (
                <TabsTrigger key={account.name} value={account.name}>
                  {account.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {idl.accounts.map((account) => (
              <TabsContent key={account.name} value={account.name}>
                <AccountTable
                  accountName={account.name}
                  idl={idl}
                  program={program}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : (
        <NoProgramFound />
      )}
    </div>
  );
}
