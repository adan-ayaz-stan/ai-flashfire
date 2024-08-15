import { TTable } from "@/types/tables";
import Link from "next/link";

export default function Table({ data }: { data: TTable }) {
  return (
    <Link href={"/" + data.id} className="p-4 bg-red-500 text-white rounded-md">
      <h2>{data.title}</h2>
    </Link>
  );
}
