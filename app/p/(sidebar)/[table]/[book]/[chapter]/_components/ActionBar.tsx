import { Button } from "@/components/ui/button";
import CreateAIFlashcards from "./CreateAIFlashcards";
import CreateFlashcard from "./CreateFlashcard";
import Link from "next/link";
import { toast } from "sonner";

export default function ActionBar({ chapter_id }: { chapter_id: string }) {
  return (
    <div className="p-4 bg-coolWhite w-full flex flex-col md:flex-row items-center my-4 gap-2 rounded-xl">
      <Link
        prefetch={false}
        className="mr-auto"
        onClick={() => {
          toast.loading("Generating test... ", {
            id: "create-test",
            description:
              "Test is dependent on number of flashcards, please wait...",
          });
        }}
        href={"/api/test/chapter/" + chapter_id}
      >
        <Button variant={"red"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <path
              fill="currentColor"
              d="M9 15v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zm10.6-9.2l1.425-1.4l-1.4-1.4L18.2 4.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925L7 9.925V17h7.05L21 10.05V19q0 .825-.587 1.413T19 21z"
            />
          </svg>{" "}
          Test Yourself
        </Button>
      </Link>

      <CreateFlashcard chapter_id={chapter_id} />
      <CreateAIFlashcards chapter_id={chapter_id} />
    </div>
  );
}
