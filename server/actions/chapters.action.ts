"use server";

import { db } from "@/lib/db/firebase";
import { TChapter } from "@/types/chapters";
import { auth } from "@clerk/nextjs/server";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getSubscription } from "./queries.actions";

/**
 * Creates a new chapter in the database with the given title and book ID.
 *
 * @param {Object} params - The parameters for creating the chapter.
 * @param {string} params.title - The title of the chapter.
 * @param {string} params.book_id - The ID of the book the chapter belongs to.
 * @return {Promise<string>} A promise that resolves to a success message if the chapter is created successfully.
 * @throws {Error} If the user is not authenticated.
 */
export async function createChapter({
  title,
  book_id,
}: {
  title: string;
  book_id: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chapterCount = await getChapterCount(book_id);
  const subscription = await getSubscription();

  if (chapterCount >= 5 && !subscription) {
    throw new Error("You have reached the maximum number of chapters");
  }

  try {
    // Format title - remove all special characters and only keep alphanumeric and spaces
    const fTitle = title
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/ /g, "_")
      .toLowerCase();

    //
    const slug = fTitle + "-" + userId + "-" + Date.now();

    await setDoc(
      doc(db, "chapters", slug),
      {
        title,
        slug,
        book_id,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return "Chapter created successfully";
    //
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves all chapters from the database that belong to the currently authenticated user and have the specified book ID.
 *
 * @param {string} book_id - The ID of the book.
 * @return {Promise<TChapter[]>} An array of chapters, each containing the chapter's ID and data.
 * @throws {Error} If the user is not authenticated.
 */
export async function getAllChapters(book_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(
      collection(db, "chapters"),
      where("userId", "==", userId),
      where("book_id", "==", book_id)
    );
    const chapters = await getDocs(q);

    const data = chapters.docs.map((ele) => {
      const d = ele.data();

      return {
        id: ele.id,
        ...d,
      } as TChapter;
    });

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves a chapter from the database by its ID.
 *
 * @param {string} chapter_id - The ID of the chapter to retrieve.
 * @return {TChapter} The retrieved chapter data, including its ID and other properties.
 */
export async function getChapter(chapter_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const table = await getDoc(doc(db, "chapters", chapter_id));
    const data = {
      id: table.id,
      ...table.data(),
    } as TChapter;

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getAllUserChapters() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(collection(db, "chapters"), where("userId", "==", userId));
    const chapters = await getDocs(q);

    const data = chapters.docs.map((ele) => {
      const d = ele.data();

      return {
        id: ele.id,
        ...d,
      } as TChapter;
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getChapterCount(book_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(
      collection(db, "chapters"),
      where("userId", "==", userId),
      where("book_id", "==", book_id)
    );
    const snap = await getCountFromServer(q);

    const count = snap.data().count;

    return count;
  } catch (err) {
    throw err;
  }
}
