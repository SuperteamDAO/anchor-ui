"use client";
import { useCurrentProgramStore } from "@/hooks/useCurrentProgram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccountTable from "./_components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NoProgramFound from "@/components/NoProgramFound";
import { useEffect, useState } from "react";
import { useClusterStore } from "@/hooks/useClusterStore";

export default function AccountPage() {
  const program = useCurrentProgramStore((state) => state.program);
  const idl = program?.rawIdl;
  const [activeTab, setActiveTab] = useState(idl?.accounts?.[0]?.name ?? "");
  const cluster = useClusterStore((state) => state.cluster);

  useEffect(() => {
    setActiveTab(idl?.accounts?.[0]?.name ?? "");
  }, [cluster, idl?.accounts]);

  return (
    <div className="flex  w-full min-h-[89vh]  flex-col ">
      {idl?.accounts !== undefined && program !== null ? (
        <div className="py-2 px-4">
          <Tabs defaultValue={activeTab} className="w-full">
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
