"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Book from "./Book";
import { getAllBooks } from "@/server/actions/books.action";

export default function AllBooks({ table_id }: { table_id: string }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["book", "all"],
    queryFn: () => getAllBooks(table_id),
    initialData: [
      {
        id: "som-dv-v92",
        userId: "2f3r21421",
        slug: "this_is_card-2f3r21421",
        title: "Demo Book",
        table_id: table_id,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
      {
        id: "som-dv-v2592",
        userId: "2f3124r21421",
        slug: "this_is5_card-32f3r214121",
        title: "University Book",
        table_id: table_id,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
    ],
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
    return <div className="w-full">No books found.</div>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {isSuccess &&
        data.map((ele) => {
          return <Book key={ele.id} data={ele} />;
        })}
    </div>
  );
}
