"use client";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import React, { useEffect } from "react";

type AccountTableProps = {
  accountName: string;
};

function AccountTable({ accountName }: AccountTableProps) {
  const { program, idl } = useAnchorStore();

  useEffect(() => {
    (async () => {
      const data = await program?.account[accountName.toLowerCase()].all();
      console.log("ACCOUNT DATA", data);
    })();
  }, [program, idl, accountName]);
  return <div>This is going to be a table</div>;
}

export default AccountTable;
