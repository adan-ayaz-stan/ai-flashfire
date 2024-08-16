"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { getAllUserChapters } from "@/server/actions/chapters.action";
import TestChapterLink from "./TestChapterLink";

export default function AllTestChapters() {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["chapter", "all"],
    queryFn: () => getAllUserChapters(),
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
    <div className="w-full flex flex-row flex-wrap gap-4 mt-8">
      {data.map((chapter) => (
        <TestChapterLink key={chapter.id} data={chapter} />
      ))}
    </div>
  );
}
