import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => (
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
