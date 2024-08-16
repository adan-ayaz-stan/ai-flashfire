import Navbar from "../(sidebar)/dashboard/_components/Navbar";
import AllTestChapters from "./_components/AllTestChapters";

export default function Test() {
  return (
    <div className="min-h-screen bg-davy text-white px-4 pt-24">
      <Navbar />
      <h1>Is it time to test yourself on some flashcards?</h1>

      {/* Here you list all the chapters with a test me button on them */}
      <AllTestChapters />
    </div>
  );
}
