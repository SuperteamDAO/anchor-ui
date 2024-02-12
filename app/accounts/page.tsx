"use client";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as anchor from "@coral-xyz/anchor";
import AccountTable from "./_components/table";

export default function AccountPage() {
  const { program, idl } = useAnchorStore();

  return (
    <div className="flex min-h-screen  w-full  flex-col ">
      {idl.accounts !== undefined ? (
        <div className="py-2 px-4">
          <Tabs defaultValue={idl.accounts[0].name} className="w-[400px]">
            <TabsList>
              {idl.accounts.map((account) => (
                <TabsTrigger key={account.name} value={account.name}>
                  {account.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {idl.accounts.map((account) => (
              <TabsContent key={account.name} value={account.name}>
                <AccountTable accountName={account.name} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold">No account found</h1>
          <p className="text-lg">Please create an account first.</p>
        </div>
      )}
    </div>
  );
}
