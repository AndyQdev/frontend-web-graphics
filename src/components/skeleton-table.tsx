import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable({ rows = 10 }: { rows?: number }) {
    return (
      <>
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index} className="border-b">
            <td className="px-4 py-2 w-2/3">
              <Skeleton className="h-4 w-32" />
            </td>
            <td className="px-4 py-2 text-right w-1/3">
              <Skeleton className="h-4 w-16" />
            </td>
          </tr>
        ))}
      </>
    );
  }
  