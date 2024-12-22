import UIVerseCard from "./Card/Card";

export default function ThirdSection() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-blue-800  to-blue-700 text-white">
      <div className="max-w-5xl w-full h-full mx-auto p-4">
        <h1>
          A flashcard application built for ease, motivating, gamified, progress
          tracking, and more.
        </h1>

        <div className="flex flex-col md:flex-row justify-between md:gap-4">
          <UIVerseCard title="Level Up Your Learning Journey" subtitle="" />
          <UIVerseCard title="Smarter Flashcards, Smarter You" subtitle="" />
          <UIVerseCard title="Ace every test with AI precision" subtitle="" />
        </div>
      </div>
    </div>
  );
}
