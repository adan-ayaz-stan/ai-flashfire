"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Book from "./Book";
import { getAllBooks } from "@/server/actions/books.action";

export default function AllBooks({ table_id }: { table_id: string }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["book", "all", table_id],
    queryFn: () => getAllBooks(table_id),
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
      {isSuccess && data.map((book) => <Book key={book.id} data={book} />)}
    </div>
  );
}
