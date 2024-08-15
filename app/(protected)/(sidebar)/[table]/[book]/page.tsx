import { getBook } from "@/server/actions/books.action";
import { notFound } from "next/navigation";
import CreateChapter from "./_components/CreateChapter";
import AllChapters from "./_components/AllChapters";

export default async function Book({
  params,
}: {
  params: { table: string; book: string };
}) {
  const book = await getBook(params.book);

  if (!book.title) {
    return notFound();
  }

  return (
    <div>
      <div className="w-full flex items-center mb-4">
        <h2 className="mr-auto">Chapters</h2>

        {/*  */}
        <CreateChapter book_id={book.id} />
      </div>

      <AllChapters book_id={book.id} />
    </div>
  );
}
