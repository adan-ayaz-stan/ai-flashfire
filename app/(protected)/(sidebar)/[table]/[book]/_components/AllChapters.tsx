"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Chapter from "./Chapter";
import { getAllChapters } from "@/server/actions/chapters.action";

export default function AllChapters({ book_id }: { book_id: string }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["chapter", "all"],
    queryFn: () => getAllChapters(book_id),
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
    return <div className="w-full">No chapters found.</div>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {isSuccess &&
        data.map((ele, i) => {
          return (
            <Chapter
              key={ele.id}
              data={ele}
              className={i % 2 == 0 ? "bg-coolWhite" : "bg-fire text-white"}
            />
          );
        })}
    </div>
  );
}
