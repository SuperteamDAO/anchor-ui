"use client";
import { useAccountData } from "@/hooks/useAccountData";
import * as anchor from "@coral-xyz/anchor";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IdlDefinedFieldsNamed } from "@coral-xyz/anchor/dist/cjs/idl";

type AccountTableProps = {
  accountName: string;
  program: anchor.Program;
  idl: anchor.Idl;
};

// I need to fix the types here as i think this takes in the structure of the item
function accountColumns(rowStructure: Record<string, string>) {
  const accountKeys = Object.keys(rowStructure);
  const accountValues = Object.values(rowStructure);
  const accountDataColumn = accountKeys.map((key, idx) => {
    return {
      header:
        key.charAt(0).toUpperCase() +
        key.slice(1) +
        " (" +
        accountValues[idx] +
        ")",
      accessorKey: key,
    };
  });
  const columns = [...accountDataColumn];
  return columns as ColumnDef<typeof rowStructure>[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border min-w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Add Error Boundary for this page itself or this component
function AccountTable({ accountName, idl, program }: AccountTableProps) {
  const typedAccountName = accountName as keyof typeof idl.accounts;
  console.log("Account Name", accountName);
  console.log("typedAccountName", typedAccountName);
  const { data, isLoading, isError } = useAccountData(
    program,
    typedAccountName
  );
  console.log("data", data);

  const accountType = idl.types?.find((type) => type.name === accountName);
  console.log("accountType", accountType);

  let rowStructure: Record<string, string> = { publicKey: "pubkey" };

  if (accountType?.type.kind === "struct") {
    const accountFields = accountType.type.fields as IdlDefinedFieldsNamed;
    accountFields?.forEach((field) => {
      rowStructure[field.name] = field.type as string;
    });
  }

  const accountDataColumn = accountColumns(rowStructure);
  console.log("accountDataColumn", accountDataColumn);

  const modifiedData = data?.map((item) => {
    const { account, publicKey } = item;
    return {
      publicKey: publicKey.toString(),
      ...(account as any),
    };
  });

  return (
    <div className="w-full">
      {modifiedData && (
        <DataTable columns={accountDataColumn} data={modifiedData} />
      )}
    </div>
  );
}

export default AccountTable;
