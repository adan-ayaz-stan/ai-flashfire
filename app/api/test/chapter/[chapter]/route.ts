import { getChapter } from "@/server/actions/chapters.action";
import { getAllFlashcards } from "@/server/actions/flashcards.action";
import {
  createNewTest,
  generateTestQuestionsFromFlashcards,
  getTotalTestCount,
} from "@/server/actions/test.action";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function GET(
  req: Request,
  { params }: { params: { chapter: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get Chapter Id
  const { chapter: chapter_id } = params;

  try {
    // Get test count
    const testCount = await getTotalTestCount();

    if (testCount >= 3) {
      return NextResponse.redirect("https://flashfire.vercel.app/pricing");
    }

    // Get flashcards from chapter
    const flashcards = await getAllFlashcards(chapter_id);
    const chapter = await getChapter(chapter_id);

    // Count the flashcards
    const flashcardCount = flashcards.length;

    // If flashcards length is 0, return error
    if (flashcardCount < 10) {
      return new NextResponse(
        "Test not available for less than 10 flashcards",
        {
          status: 400,
        }
      );
    }

    // If flashcards length is more than 10, select 10 random flashcards
    if (flashcardCount > 10) {
      const flashcardIndex = Math.floor(Math.random() * flashcardCount);
      const selectedFlashcards = flashcards.slice(
        flashcardIndex,
        flashcardIndex + 10
      );

      const testQuestions = await generateTestQuestionsFromFlashcards(
        selectedFlashcards
      );

      const testId = await createNewTest(
        testQuestions.object,
        chapter.title + " Test"
      );

      return NextResponse.redirect(process.env.BASE_URL + `/p/test/${testId}`);
    }

    return NextResponse.redirect(process.env.BASE_URL + "/p/dashboard");
  } catch (err) {
    return new NextResponse("Internal Server Error: " + err, { status: 500 });
  }
}
