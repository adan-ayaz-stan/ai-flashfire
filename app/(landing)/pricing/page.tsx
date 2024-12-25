import Link from "next/link";
import Navbar from "../_components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckMark } from "./_components/CheckMark";
import { Button } from "@/components/ui/button";
import Footer from "../_components/Footer";

const features = [
  { feature: "Table Creation Limit", free: "3", paid: "No Limit" },
  { feature: "Book Creation Limit", free: "3", paid: "No Limit" },
  { feature: "Chapter Creation Limit", free: "5", paid: "No Limit" },
  { feature: "AI Flashcard Generation Limit", free: "5", paid: "No Limit" },
  { feature: "Test Creation Limit", free: "3", paid: "No Limit" },
  { feature: "Support Priority", free: "Standard", paid: "High" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-davy text-white bg-[url('https://img.freepik.com/free-vector/abstract-3d-art-background-holographic-floating-liquid-blobs-soap-bubbles-metaballs_1142-9279.jpg?t=st=1723626023~exp=1723629623~hmac=b69cd188c9e5e36ac828f4ef4c9a29b24e1ff41d3a810ddf352f3343838ca15a&w=2000')] bg-center bg-cover">
      <div className="min-h-screen backdrop-blur-xl p-4 pt-24 flex items-center justify-center flex-col">
        <Navbar />

        <h1 className="mx-auto mt-8">Simple pricing with no hidden fees</h1>
        <p className="mt-2 mb-8">
          Are you ready to invest in a fully fledged flashcard study schedule?
        </p>

        <div className="w-full flex flex-col md:flex-row gap-8 items-stretch justify-center mb-10">
          <div className="p-4 w-full max-w-xs bg-pink-300 text-black rounded-xl">
            <strong>Limited</strong>
            <h2 className="my-4">Free</h2>
            <p>Free plan for all users</p>

            <ul className="space-y-3 mt-4">
              {features.map((feat) => {
                return (
                  <li key={feat.feature} className="flex items-center gap-2">
                    <CheckMark /> {feat.free} {feat.feature}
                  </li>
                );
              })}
            </ul>

            <Link href={"/sign-up"}>
              {" "}
              <Button variant={"secondary"} className="w-full mt-4">
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="p-4 w-full max-w-xs bg-cyan-400 text-black rounded-xl">
            <strong>Expanded</strong>
            <h2 className="my-4">$ 4.99</h2>
            <p>Limitless plan for subscribed users</p>

            <ul className="space-y-3 mt-4">
              {features.map((feat) => {
                return (
                  <li key={feat.feature} className="flex items-center gap-2">
                    <CheckMark /> {feat.paid} {feat.feature}
                  </li>
                );
              })}
            </ul>

            <Link href={"/sign-up"}>
              <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <strong className="tracking-widest text-center w-full">
            FEATURES
          </strong>
          <h1 className="text-center">All the features you need!</h1>
          <section className="body-font">
            <div className="container py-24 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex rounded-lg p-8 sm:flex-row flex-col bg-dumbBlue">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-blue-900 text-lg title-font font-medium mb-3">
                        Instant Flashcard Creation from Content
                      </h2>
                      <p className="leading-relaxed text-base">
                        Turn any text or content into engaging flashcards with
                        just a few clicks. Our AI-powered tool extracts key
                        concepts and facts, allowing you to create customized
                        study materials quickly and efficiently, so you can
                        focus on what matters most—learning!
                      </p>
                      <a className="mt-3 text-indigo-800 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex bg-dumbBlue rounded-lg p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-blue-900 text-lg title-font font-medium mb-3">
                        Organize Your Learning with Subjects and Chapters
                      </h2>
                      <p className="leading-relaxed text-base">
                        Keep your studies organized with the ability to create
                        distinct subjects and chapters. Dive deep into each
                        topic by creating flashcards within chapters, making it
                        easier to navigate your learning materials and build a
                        comprehensive understanding of each subject.
                      </p>
                      <a className="mt-3 text-indigo-800 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex bg-dumbBlue rounded-lg p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-blue-900 text-lg title-font font-medium mb-3">
                        Transform Flashcards into Tests
                      </h2>
                      <p className="leading-relaxed text-base">
                        Seamlessly convert your flashcards into comprehensive
                        tests to assess your knowledge and retention. Our
                        intelligent algorithm generates quizzes tailored to your
                        study material, helping you reinforce learning and track
                        your progress effectively.
                      </p>
                      <a className="mt-3 text-indigo-800 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex bg-dumbBlue rounded-lg p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-blue-900 text-lg title-font font-medium mb-3">
                        Collaborative Table Creation (Coming Soon)
                      </h2>
                      <p className="leading-relaxed text-base">
                        Enhance your study experience with our upcoming feature
                        that allows you to create collaborative tables. Work
                        together with other users to share flashcards, insights,
                        and resources, fostering a community of learners and
                        enriching your educational journey.
                      </p>
                      <a className="mt-3 text-indigo-800 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Link href={"/sign-up"} className="mx-auto mt-4 md:mt-auto">
            <Button className="mx-auto p-8">
              <h2>START NOW</h2>
            </Button>
          </Link>
          <Footer />
        </div>
      </div>
    </div>
  );
}
