"use client";
import { useAccountData } from "@/hooks/useAccountData";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import * as anchor from "@coral-xyz/anchor";
import React, { useEffect } from "react";

type AccountTableProps = {
  accountName: string;
  program: anchor.Program;
  idl: anchor.Idl;
};

// Add Error Boundary for this page itself or this component
function AccountTable({ accountName, idl, program }: AccountTableProps) {
  const { data, isLoading, isError } = useAccountData(program, accountName);

  return <div>This is going to be a table</div>;
}

export default AccountTable;
