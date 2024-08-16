"use client";

import { cn } from "@/lib/utils";
import { TChapter } from "@/types/chapters";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Chapter({
  data,
  className,
}: {
  data: TChapter;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={pathname + "/" + data.slug}
      className={cn(
        "p-4 rounded-lg bg-coolWhite hover:-translate-y-3 transition-all duration-300",
        className
      )}
    >
      {data.title}
    </Link>
  );
}
