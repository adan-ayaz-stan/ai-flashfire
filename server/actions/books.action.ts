"use server";

import { db } from "@/lib/db/firebase";
import { TBook } from "@/types/books";
import { TTable } from "@/types/tables";
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

/**
 * Creates a new book in the database with the given title and table ID.
 *
 * @param {Object} params - The parameters for creating the book.
 * @param {string} params.title - The title of the book.
 * @param {string} params.table_id - The ID of the table the book belongs to.
 * @return {Promise<string>} A promise that resolves to a success message if the book is created successfully.
 * @throws {Error} If the user is not authenticated.
 */
export async function createBook({
  title,
  table_id,
}: {
  title: string;
  table_id: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const bookCount = await getBooksCount();

  if (bookCount >= 3) {
    throw new Error("You have reached the maximum number of books");
  }

  try {
    // Format title - replace all spaces with _
    const fTitle = title
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/ /g, "_")
      .toLowerCase();

    //
    const slug = fTitle + "-" + userId + "-" + Date.now();

    await setDoc(
      doc(db, "books", slug),
      {
        title,
        slug,
        table_id,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return "Book created successfully";
    //
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves all books from the database that belong to the currently authenticated user and have the specified table ID.
 *
 * @param {string} table_id - The ID of the table.
 * @return {Promise<TBook[]>} An array of books, each containing the book's ID and data.
 * @throws {Error} If the user is not authenticated.
 */
export async function getAllBooks(table_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(
      collection(db, "books"),
      where("userId", "==", userId),
      where("table_id", "==", table_id)
    );
    const tables = await getDocs(q);

    const data = tables.docs.map((ele) => {
      const d = ele.data();

      return {
        id: ele.id,
        ...d,
      } as TBook;
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getBook(book_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const table = await getDoc(doc(db, "books", book_id));
    const data = {
      id: table.id,
      ...table.data(),
    } as TBook;

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getBooksCount() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(collection(db, "books"));
    const snap = await getCountFromServer(q);

    const count = snap.data().count;

    console.log(snap);

    return count;
  } catch (err) {
    throw err;
  }
}
