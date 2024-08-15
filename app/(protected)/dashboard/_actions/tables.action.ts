"use server";

import { db } from "@/lib/db/firebase";
import { TTable } from "@/types/tables";
import { auth } from "@clerk/nextjs/server";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

/**
 * Creates a new table in the database.
 *
 * @param {string} title - The title of the table to be created.
 * @return {string} A success message if the table is created successfully.
 */
export async function createTable(title: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    // Format title - replace all spaces with _
    const fTitle = title.replace(/ /g, "_");

    //
    const slug = fTitle + "-" + userId + "-" + Date.now();

    await setDoc(
      doc(db, "tables", slug),
      {
        title,
        slug,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return "Table created successfully";
    //
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves all tables from the database that belong to the currently authenticated user.
 *
 * @return {TTable[]} An array of tables, each containing the table's ID and data.
 */
export async function getAllTables() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(collection(db, "tables"), where("userId", "==", userId));
    const tables = await getDocs(q);

    const data = tables.docs.map((ele) => {
      const d = ele.data() as TTable;

      return {
        id: ele.id,
        ...d,
      };
    });

    return data;
  } catch (err) {
    throw err;
  }
}
