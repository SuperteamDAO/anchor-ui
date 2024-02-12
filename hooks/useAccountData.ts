import * as anchor from "@coral-xyz/anchor";
import { useQuery } from "@tanstack/react-query";

//TODO:(Pratik) Add Filter support to this
const getAllAccountsData = async (
  program: anchor.Program,
  accountName: string
) => {
  return await program.account[accountName].all();
};

export function useAccountData(program: anchor.Program, accountName: string) {
  const query = useQuery({
    queryKey: [accountName],
    queryFn: () => getAllAccountsData(program, accountName),
  });
  return query;
}
