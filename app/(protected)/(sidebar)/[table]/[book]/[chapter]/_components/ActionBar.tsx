import CreateAIFlashcards from "./CreateAIFlashcards";
import CreateFlashcard from "./CreateFlashcard";

export default function ActionBar({ chapter_id }: { chapter_id: string }) {
  return (
    <div className="p-4 bg-coolWhite w-full flex items-center my-4 gap-2">
      <p className="mr-auto">Something goes here</p>

      <CreateFlashcard chapter_id={chapter_id} />
      <CreateAIFlashcards chapter_id={chapter_id} />
    </div>
  );
}
