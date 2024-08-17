"use client";

import { getAllFlashcards } from "@/server/actions/flashcards.action";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Flashcard from "./Flashcard";

export default function AllFlashcards({ chapter_id }: { chapter_id: string }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["flashcard", "all", chapter_id],
    queryFn: () => getAllFlashcards(chapter_id),
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
    return <div className="w-full">No flashcards found.</div>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-8 pl-4">
      {isSuccess &&
        data.map((ele, i) => {
          const classNames = [
            "bg-dumbBlue",
            "bg-[#6d597a] text-white",
            "bg-seaGreen",
            "bg-fire",
            "bg-[#003049] text-white",
          ];

          const color = classNames[i % classNames.length];

          return (
            <Flashcard key={ele.id} data={ele} questionClassName={color} />
          );
        })}
    </div>
  );
}
