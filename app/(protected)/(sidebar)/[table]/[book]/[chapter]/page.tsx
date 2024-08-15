import { getChapter } from "@/server/actions/chapters.action";
import { notFound } from "next/navigation";
import ActionBar from "./_components/ActionBar";
import AllFlashcards from "./_components/AllFlashcards";

export default async function Chapter({
  params,
}: {
  params: { table: string; book: string; chapter: string };
}) {
  const chapter = await getChapter(params.chapter);

  if (!chapter.title) {
    return notFound();
  }

  return (
    <div>
      <h1>{chapter.title}</h1>
      <ActionBar chapter_id={chapter.id} />

      <AllFlashcards chapter_id={chapter.id} />
    </div>
  );
}
