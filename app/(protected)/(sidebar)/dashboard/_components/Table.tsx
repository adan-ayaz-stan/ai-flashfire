import { TTable } from "@/types/tables";
import Image from "next/image";
import Link from "next/link";

export default function Table({ data }: { data: TTable }) {
  const creationDate = new Date(data.createdAt);
  const updatedDate = new Date(data.updatedAt);
  const today = new Date();

  return (
    <Link
      href={"/" + data.id}
      className="w-full relative max-w-sm p-4 border-red-500 border-2 rounded-md overflow-y-hidden group"
    >
      <Image
        src={"/table.png"}
        alt="table"
        className="absolute top-full -rotate-12 -translate-y-1/2 left-4 group-hover:-translate-y-3/4 group-hover:rotate-6 transition-all duration-500"
        height={75}
        width={75}
      />
      <Image
        src={"/table.png"}
        alt="table"
        className="absolute top-full rotate-12 -translate-y-1/2 left-20 group-hover:-translate-y-3/4 group-hover:rotate-3 transition-all duration-500"
        height={75}
        width={75}
      />

      {/*  */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className="absolute top-2 right-2 text-fire"
      >
        <g fill="currentColor">
          <path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z" />
        </g>
      </svg>
      {/*  */}
      <h2 className="text-fire">{data.title}</h2>
      <p className="ml-auto bg-fire text-white rounded-md px-2 py-1 text-sm font-bold w-fit">
        {today.getTime() - updatedDate.getTime() < 24 * 60 * 60 * 1000 ? (
          "Recently Updated"
        ) : (
          <>Updated {updatedDate.toLocaleDateString()}</>
        )}
      </p>
    </Link>
  );
}
