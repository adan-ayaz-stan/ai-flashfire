"use client";

import { getAllFlashcards } from "@/server/actions/flashcards.action";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Flashcard from "./Flashcard";

export default function AllFlashcards({ chapter_id }: { chapter_id: string }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["flashcard", "all"],
    queryFn: () => getAllFlashcards(chapter_id),
    initialData: [
      {
        id: "1",
        answer: "There are around roughly 200 countries.",
        chapter_id:
          "cellitscomponents-user_2ZiyRhtpdUVa6oKLVNoASqRCt0x-1723715843845",
        createdAt: 1723718353864,
        question: "How many countries are there in the world?",
        updatedAt: 1723718353864,
        userId: "user_2ZiyRhtpdUVa6oKLVNoASqRCt0x",
      },
      {
        id: "4",
        answer: "The capital of France is Paris.",
        chapter_id: "europegeo-user_4XKjpjVPDAVB6pMleVfGtRlOx-1723712470506",
        createdAt: 1723718354864,
        question: "What is the capital of France?",
        updatedAt: 1723718354864,
        userId: "user_4XKjpjVPDAVB6pMleVfGtRlOx",
      },
      {
        id: "1252",
        answer: "The largest planet in our solar system is Jupiter.",
        chapter_id: "spaceexploration-user_K3dqoLVRPwW9pGtOx-1723712470507",
        createdAt: 1723718355864,
        question: "What is the largest planet in our solar system?",
        updatedAt: 1723718355864,
        userId: "user_K3dqoLVRPwW9pGtOx",
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
    return (
      <div className="w-full">
        No flashcards found.
        <Flashcard
          data={{
            id: "1252",
            answer: "The largest planet in our solar system is Jupiter.",
            chapter_id: "spaceexploration-user_K3dqoLVRPwW9pGtOx-1723712470507",
            createdAt: 1723718355864,
            question: "What is the largest planet in our solar system?",
            updatedAt: 1723718355864,
            userId: "user_K3dqoLVRPwW9pGtOx",
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-8 pl-4">
      {isSuccess &&
        data.map((ele) => {
          return <Flashcard key={ele.id} data={ele} />;
        })}
    </div>
  );
}
