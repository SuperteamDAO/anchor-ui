"use client";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as anchor from "@coral-xyz/anchor";

export default function AccountPage() {
  const { program, idl } = useAnchorStore();

  return (
    <div className="flex min-h-screen  w-full  flex-col">
      {idl.accounts !== undefined ? (
        <Tabs defaultValue={idl.accounts[0].name} className="w-[400px]">
          <TabsList>
            {idl.accounts.map((account) => (
              <TabsTrigger key={account.name} value={account.name}>
                {account.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Storage">
            Make changes to your account here.
          </TabsContent>
        </Tabs>
      ) : (
        <div>
          <h1 className="text-4xl font-bold">No account found</h1>
          <p className="text-lg">Please create an account first.</p>
        </div>
      )}
    </div>
  );
}
