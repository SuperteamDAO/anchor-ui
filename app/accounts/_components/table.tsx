"use client";
import { useAccountData, useOneAccountData } from "@/hooks/useAccountData";
import * as anchor from "@coral-xyz/anchor";
import React, { useState } from "react";
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
import { LoadingSkeleton } from "./TableLoading";
import SearchByPubkey from "./Search";

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
  refetchData: () => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  refetchData,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-2">
      <DataTableViewOptions refetchData={refetchData} table={table} />
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

// Add Error Boundary for this page itself or this component
function AccountTable({ accountName, idl, program }: AccountTableProps) {
  const typedAccountName = accountName as keyof typeof idl.accounts;
  console.log("Account Name", accountName);
  console.log("typedAccountName", typedAccountName);
  const [searchPubkey, setSearchPubkey] = useState<string>("");
  const { data, isLoading, isError, refetch, isRefetching } = useAccountData(
    program,
    typedAccountName
  );
  const { data: searchData, refetch: refetchSearchData } = useOneAccountData(
    program,
    typedAccountName,
    searchPubkey
  );

  const refetchAllAccountData = async () => {
    setSearchPubkey("");

    await refetch();
  };

  console.log("isRefetching", isRefetching);

  if (isLoading || isRefetching) return <LoadingSkeleton />;
  if (isError) return <div>Failed to load data</div>;

  const handleSearch = () => {
    refetchSearchData();
  };

  const accountType = idl.types?.find((type) => type.name === accountName);
  let rowStructure: Record<string, string> = { account: "pubkey" };

  if (accountType?.type.kind === "struct") {
    const accountFields = accountType.type.fields as IdlDefinedFieldsNamed;
    accountFields?.forEach((field) => {
      rowStructure[field.name] = field.type as string;
    });
  }
  const accountDataColumn = accountColumns(rowStructure);

  let modifiedData = data?.map((item) => {
    const { account, publicKey } = item;
    return {
      account: publicKey.toString(),
      ...(account as any),
    };
  });

  if (searchData && searchPubkey) {
    modifiedData = [
      {
        account: searchPubkey,
        ...(searchData as any),
      },
    ];
  }

  return (
    <div className="w-full">
      {modifiedData && (
        <>
          <SearchByPubkey
            handleSearch={handleSearch}
            setSearchValue={setSearchPubkey}
          />
          <DataTable
            columns={accountDataColumn}
            data={modifiedData}
            refetchData={refetchAllAccountData}
          />
        </>
      )}
    </div>
  );
}

export default AccountTable;
