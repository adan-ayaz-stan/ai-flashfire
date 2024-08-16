import Navbar from "../(sidebar)/dashboard/_components/Navbar";
import AllTestChapters from "./_components/AllTestChapters";
import AllTests from "./_components/AllTests";

export default async function Test() {
  return (
    <div className="min-h-screen bg-davy text-white px-4 pt-24">
      <Navbar />
      <h1>Your tests</h1>
      <AllTests />

      <h1 className="mt-8">Is it time to test yourself on some flashcards?</h1>

      {/* Here you list all the chapters with a test me button on them */}
      <AllTestChapters />
    </div>
  );
}
