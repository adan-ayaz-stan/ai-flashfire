import { getTable } from "@/server/actions/tables.action";
import { notFound } from "next/navigation";
import Navbar from "../dashboard/_components/Navbar";
import Sidebar from "../dashboard/_components/SIdebar";
import CreateBook from "./_components/CreateBook";
import AllBooks from "./_components/AllBooks";

export default async function Table({ params }: { params: { table: string } }) {
  const table = await getTable(params.table);

  if (!table.title) {
    return notFound();
  }

  return (
    <>
      <div className="w-full flex items-center mb-4">
        <h2 className="mr-auto">Books</h2>

        {/*  */}
        <CreateBook table_id={table.id} />
      </div>

      <AllBooks table_id={table.id} />
    </>
  );
}
