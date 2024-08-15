import { TTable } from "@/types/tables";

export default function Table({ data }: { data: TTable }) {
  return (
    <div className="p-4 bg-red-500 text-white rounded-md">
      <h2>{data.title}</h2>
    </div>
  );
}
