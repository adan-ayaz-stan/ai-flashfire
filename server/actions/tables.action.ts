"use server";

import { db } from "@/lib/db/firebase";
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
    const fTitle = title
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/ /g, "_")
      .toLowerCase();

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
      const d = ele.data();

      return {
        id: ele.id,
        ...d,
      } as TTable;
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getTablesCount() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const q = query(collection(db, "tables"), where("userId", "==", userId));
    const snap = await getCountFromServer(q);

    const count = snap.data().count

    return count;
  } catch (err) {
    throw err;
  }
}

export async function getTable(table_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const table = await getDoc(doc(db, "tables", table_id));
    const data = {
      id: table.id,
      ...table.data(),
    } as TTable;

    return data;
  } catch (err) {
    throw err;
  }
}
