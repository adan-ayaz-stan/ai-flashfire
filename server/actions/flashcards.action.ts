"use server";

import { db } from "@/lib/db/firebase";
import { TFlashcard } from "@/types/flashcards";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

/**
 * Creates a new flashcard with the given question, answer, and chapter ID.
 *
 * @param {object} params - An object containing the question, answer, and chapter ID.
 * @param {string} params.question - The question for the flashcard.
 * @param {string} params.answer - The answer for the flashcard.
 * @param {string} params.chapter_id - The ID of the chapter the flashcard belongs to.
 * @return {string} A success message if the flashcard is created successfully.
 */
export async function createFlashcard({
  question,
  answer,
  chapter_id,
}: {
  question: string;
  answer: string;
  chapter_id: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const slug = randomUUID().replace(/-/g, "_");

    await setDoc(
      doc(db, "flashcards", slug),
      {
        question,
        answer,
        userId,
        chapter_id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return "Flashcard created successfully";
    //
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves all flashcards from the database that belong to the currently authenticated user and have the specified chapter ID.
 *
 * @param {string} chapter_id - The ID of the chapter.
 * @return {TFlashcard[]} An array of flashcards, each containing the flashcard's ID and data.
 */
export async function getAllFlashcards(chapter_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(
      collection(db, "flashcards"),
      where("userId", "==", userId),
      where("chapter_id", "==", chapter_id)
    );
    const books = await getDocs(q);

    const data = books.docs.map((ele) => {
      const d = ele.data();

      return {
        id: ele.id,
        ...d,
      } as TFlashcard;
    });

    return data;
  } catch (err) {
    throw err;
  }
}
