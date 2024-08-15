"use client";

import { TChapter } from "@/types/chapters";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Chapter({ data }: { data: TChapter }) {
  const pathname = usePathname();

  return (
    <Link
      href={pathname + "/" + data.slug}
      className="p-4 rounded-lg bg-coolWhite"
    >
      {data.title}
    </Link>
  );
}
