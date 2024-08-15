"use server";

import { db } from "@/lib/db/firebase";
import { TChapter } from "@/types/chapters";
import { auth } from "@clerk/nextjs/server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
    const books = await getDocs(q);

    const data = books.docs.map((ele) => {
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
