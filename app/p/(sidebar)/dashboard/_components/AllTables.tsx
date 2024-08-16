"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTables } from "../../../../../server/actions/tables.action";
import { Loader } from "lucide-react";
import Table from "./Table";

export default function AllTables() {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["table", "all"],
    queryFn: () => getAllTables(),
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="p-8 w-fit m-auto flex rounded-xl bg-coolWhite">
        <Loader className="animate-spin w-8 h-8 m-auto" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full border-2 border-red-600 flex flex-col items-center justify-center">
        <p>Something went wrong</p>
        <pre className="text-sm">{error.message}</pre>
      </div>
    );
  }

  if (isSuccess && data.length == 0) {
    return <div className="w-full"></div>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {isSuccess &&
        data.map((ele) => {
          return <Table key={ele.id} data={ele} />;
        })}
    </div>
  );
}
