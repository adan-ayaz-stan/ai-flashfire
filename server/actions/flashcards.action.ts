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
