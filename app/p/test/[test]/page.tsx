import { getTest } from "@/server/actions/test.action";
import { notFound } from "next/navigation";
import TestSlideLive from "./_components/TestSlideLive";

export default async function Test({ params }: { params: { test: string } }) {
  const test = await getTest(params.test);

  if (!test.title) {
    notFound();
  }
  // Get the test questions for the test
  // Start the test with questions appearing one by one
  // Display the score at the end

  return (
    <div className="min-h-screen bg-davy text-white">
      <TestSlideLive data={test} />
    </div>
  );
}
