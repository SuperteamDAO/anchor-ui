"use client";
import { useAccountData } from "@/hooks/useAccountData";
import { useAnchorStore } from "@/hooks/useAnchorStore";
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

type AccountTableProps = {
  accountName: string;
  program: anchor.Program;
  idl: anchor.Idl;
};

// I need to fix the types here as i think this takes in the structure of the item
function accountColumns(rowStructure: Record<string, string>) {
  const accountKeys = Object.keys(rowStructure);
  const accountDataColumn = accountKeys.map((key) => {
    return {
      header: key.toUpperCase(),
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
  const { data, isLoading, isError } = useAccountData(program, accountName);
  console.log("idl", idl);
  console.log("data", data);
  const accountKeys = idl.accounts
    ?.find((account) => account.name === accountName)
    ?.type.fields.map((field) => field.name);

  let rowStructure: Record<string, string> = { publicKey: "" };
  if (accountKeys) {
    rowStructure = accountKeys.reduce((acc, key) => {
      return { ...acc, [key]: "" };
    }, rowStructure);
  }

  const accountDataColumn = accountColumns(rowStructure);

  const modifiedData = data?.map((item) => {
    const { account, publicKey } = item;
    return {
      publicKey: publicKey.toString(),
      ...account,
    };
  });

  console.log("modifiedData", modifiedData);

  return (
    <div className="w-full">
      {modifiedData && (
        <DataTable columns={accountDataColumn} data={modifiedData} />
      )}
    </div>
  );
}

export default AccountTable;