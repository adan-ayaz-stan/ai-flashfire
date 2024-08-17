"use server";

import { db } from "@/lib/db/firebase";
import { TFlashcard } from "@/types/flashcards";
import { TTest, TTestQuestion } from "@/types/tests";
import { mistral } from "@ai-sdk/mistral";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { randomUUID } from "crypto";
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
import { z } from "zod";

const testQuestionSchema = z.array(
  z.object({
    question: z.string().describe("This is the flashcard question."),
    answer: z.string().describe("This is the flashcard answer."),
    wrong_options: z
      .array(z.string().describe("This is an incorrect answer."))
      .min(1)
      .max(2),
  })
);

/**
 * Generates test questions from a list of flashcards.
 *
 * @param {TFlashcard[]} flashcards - An array of flashcards to generate test questions from.
 * @return {TTestQuestion[]} An array of test questions generated from the flashcards.
 */
export async function generateTestQuestionsFromFlashcards(
  flashcards: TFlashcard[]
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    //
    const result = await generateObject({
      model: mistral("mistral-small-latest"),
      schema: testQuestionSchema,
      system: `You are a test generator. You'll be given an array of { question: string; answer: string } and you will generate test questions from them. Each test question must be in format { question: string; answer: string; wrong_options: string[] }. You will generate an array of these test questions. The array length must be 10. You must not deviate from the format. You must not give any other text except of the provided format.`,
      prompt: `Generate test questions from the following: ${JSON.stringify(
        flashcards.map((f) => {
          return { question: f.question, answer: f.answer };
        })
      )}`,
    });

    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Creates a new test with the given test questions in the database.
 *
 * @param {TTestQuestion[]} testQuestions - An array of test questions to be added to the test.
 * @return {Promise<string>} A promise that resolves when the test is successfully created and a test ID is returned.
 * @throws {Error} If the user is not authenticated.
 */
export async function createNewTest(
  testQuestions: TTestQuestion[],
  title = "Untitled Test"
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const randomId = randomUUID().replace(/-/g, "_");
    //
    await setDoc(doc(db, "tests", randomId), {
      userId,
      title,
      test_questions: testQuestions,
    });

    return randomId;
  } catch (err) {
    throw err;
  }
}

/**
 * Adds test questions to an existing test in the database.
 *
 * @param {string} testId - The ID of the test to add questions to.
 * @param {TTestQuestion[]} testQuestions - An array of test questions to be added to the test.
 * @return {TTestQuestion[]} An array of all test questions in the test after addition.
 * @throws {Error} If the user is not authenticated.
 */
export async function addTestQuestionsToTest(
  testId: string,
  testQuestions: TTestQuestion[]
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const prevDoc = await getDoc(doc(db, "tests", testId));

    const allQuestions = [
      ...((prevDoc.data() as TTest)?.test_questions || []),
      ...testQuestions,
    ];

    await setDoc(doc(db, "tests", testId), {
      userId,
      test_questions: allQuestions,
    });

    return allQuestions;
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves all tests from the database that belong to the currently authenticated user.
 *
 * @return {TTest[]} An array of tests, each containing the test's ID and data.
 */
export async function getAllUserTests() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const q = query(collection(db, "tests"), where("userId", "==", userId));

    const tests = await getDocs(q);

    const data = tests.docs.map((ele) => {
      const d = ele.data();

      return {
        id: ele.id,
        ...d,
      } as TTest;
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getTest(testId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const test = await getDoc(doc(db, "tests", testId));
    return test.data() as TTest;
  } catch (err) {
    throw err;
  }
}

export async function getTotalTestCount() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const q = query(collection(db, "tests"), where("userId", "==", userId));

    const snap = await getCountFromServer(q);

    const count = snap.data().count;

    return count;
  } catch (err) {
    throw err;
  }
}
