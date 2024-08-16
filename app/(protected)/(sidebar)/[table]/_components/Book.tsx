import { TBook } from "@/types/books";
import Image from "next/image";
import Link from "next/link";

export default function Book({ data }: { data: TBook }) {
  return (
    <Link
      href={"/" + data.table_id + "/" + data.id}
      className="relative p-4 w-full max-w-sm rounded-lg bg-coolWhite"
    >
      <Image
        src={"/book.png"}
        alt="book"
        className="absolute top-0 right-0"
        height={100}
        width={100}
      />

      <h3>{data.title}</h3>
    </Link>
  );
}
