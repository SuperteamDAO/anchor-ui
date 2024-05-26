import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { useQuery } from "@tanstack/react-query";

//TODO:(Pratik) Add Filter support to this
const getAllAccountsData = async (
  program: anchor.Program,
  accountName: keyof typeof program.account
) => {
  const data = await program.account[accountName];
  return data;
};

export function useAccountData(
  program: anchor.Program,
  accountName: keyof typeof program.account
) {
  const query = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["accountData", accountName],
    queryFn: () => getAllAccountsData(program, accountName),
  });
  return query;
}
