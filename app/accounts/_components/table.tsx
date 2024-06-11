"use client";
import { useAccountData } from "@/hooks/useAccountData";
import * as anchor from "@coral-xyz/anchor";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { DataTableViewOptions } from "./toggleTable";
import { Skeleton } from "@/components/ui/skeleton";

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
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-2">
      <DataTableViewOptions table={table} />
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const LoadingSkeleton = () => (
  <>
    <div className="flex flex-col gap-2">
      <div className="items-center justify-center transition-colors border border-input px-3 ml-auto hidden h-8 lg:flex">
        <Skeleton className="w-[32px] max-w-full" />
      </div>
      <div className="border min-w-full">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[128px] max-w-full" />
                </th>
                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[144px] max-w-full" />
                </th>
                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[104px] max-w-full" />
                </th>
                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[104px] max-w-full" />
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[64px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
              </tr>
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[48px] max-w-full" />
                </td>
              </tr>
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[48px] max-w-full" />
                </td>
              </tr>
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[48px] max-w-full" />
                </td>
              </tr>
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[48px] max-w-full" />
                </td>
              </tr>
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[48px] max-w-full" />
                </td>
              </tr>
              <tr className="border-b transition-colors">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[352px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[64px] max-w-full" />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <Skeleton className="w-[56px] max-w-full" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
);

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

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <div>Failed to load data</div>;

  const accountType = idl.types?.find((type) => type.name === accountName);
  console.log("accountType", accountType);

  let rowStructure: Record<string, string> = { account: "pubkey" };

  if (accountType?.type.kind === "struct") {
    const accountFields = accountType.type.fields as IdlDefinedFieldsNamed;
    accountFields?.forEach((field) => {
      rowStructure[field.name] = field.type as string;
    });
  }

  const accountDataColumn = accountColumns(rowStructure);

  const modifiedData = data?.map((item) => {
    const { account, publicKey } = item;
    return {
      account: publicKey.toString(),
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
