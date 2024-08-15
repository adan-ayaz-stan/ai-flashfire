import { TBook } from "@/types/books";
import Link from "next/link";

export default function Book({ data }: { data: TBook }) {
  return (
    <Link
      href={"/" + data.table_id + "/" + data.id}
      className="p-4 rounded-lg bg-coolWhite"
    >
      {data.title}
    </Link>
  );
}
