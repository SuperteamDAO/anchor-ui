import * as anchor from "@coral-xyz/anchor";
import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { AllAccountsMap } from "@coral-xyz/anchor/dist/cjs/program/namespace/types";
import { useQuery } from "@tanstack/react-query";

//TODO:(Pratik) Add Filter support to this
const getAllAccountsData = async <T extends anchor.Idl>(
  program: anchor.Program<T>,
  accountName: keyof AllAccountsMap<T>
) => {
  const allData = program.account[accountName].all();

  return allData;
};

export function useAccountData<T extends anchor.Idl>(
  program: anchor.Program<T>,
  accountName: keyof AllAccountsMap<T>
) {
  type typeidl = typeof program.idl;
  const query = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["accountData", accountName],
    queryFn: () => getAllAccountsData<typeidl>(program, accountName),
  });
  return query;
}
