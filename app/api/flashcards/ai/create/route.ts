import { createFlashcard } from "@/server/actions/flashcards.action";
import { mistral } from "@ai-sdk/mistral";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const flashcardSchema = z.array(
  z.object({
    question: z.string().describe("This is the flashcard question."),
    answer: z
      .string()
      .describe("This is the flashcard answer. It must be concise."),
  })
);

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { text_chunk, chapter_id } = await req.json();

    const response = await generateObject({
      model: mistral("mistral-large-latest"),
      schema: flashcardSchema,
      schemaDescription:
        "This is the flashcard schema. It's an array of objects whose properties are `question` and `answer`.",
      system: `You are a flashcard generator. YOU ALWAYS RETURN AN ARRAY OF FLASHCARDS, NEVER AN OBJECT. You'll be given a text chunk which you will try to make sense of and you'll generate flashcards from it upto 5. Each flashcard must be in format { question: string; answer: string } and you MUST generate an array of these flashcards as [{question: string; answer: string;}].`,
      prompt:
        "Generate flashcards from the following text chunk: " + text_chunk,
    });

    for (const flashcard of response.object) {
      await createFlashcard({
        question: flashcard.question,
        answer: flashcard.answer,
        chapter_id: chapter_id,
      });
    }

    return new NextResponse(
      JSON.stringify({ generated: response.object.length }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
