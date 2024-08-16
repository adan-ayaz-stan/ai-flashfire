import { TTest } from "@/types/tests";
import Link from "next/link";

export default function TestLink({ data }: { data: TTest }) {
  return (
    <Link
      href={"/p/test/" + data.id}
      className="p-4 rounded-lg bg-coolWhite hover:-translate-y-3 transition-all duration-300"
    >
      <h2 className="text-fire">{data.title}</h2>
    </Link>
  );
}
