import Image from "next/image";
import Navbar from "./_components/Navbar";
import { Urbanist } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('https://img.freepik.com/free-vector/abstract-3d-art-background-holographic-floating-liquid-blobs-soap-bubbles-metaballs_1142-9279.jpg?t=st=1723626023~exp=1723629623~hmac=b69cd188c9e5e36ac828f4ef4c9a29b24e1ff41d3a810ddf352f3343838ca15a&w=2000')] bg-center bg-cover">
      {/* Section 1 */}

      <div className="min-h-screen relative z-10 backdrop-blur-xl pt-24">
        <Navbar />

        {/* Heading */}
        <h1 className="uppercase text-center text-coolWhite tracking-wider mt-16 mb-8 lg:text-5xl">
          Blitz Learning Never been Easier
        </h1>

        {/*  */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 w-full max-w-5xl p-4 mx-auto mt-24 px-16">
          <div className="rounded-2xl flex flex-col items-center">
            <Image
              src={"/book-illust.png"}
              alt="Books Illustration"
              width={400}
              height={400}
              className="object-contain lg:-ml-20 lg:-mt-24"
            />

            <h2
              className={`${urbanist.className} font-bold text-center text-lightBlue`}
            >
              AI Assisted <br /> Efficient Learning
            </h2>
          </div>
          {/*  */}
          <div className="w-full relative max-w-sm bg-lightBlue p-4 pt-8 rounded-3xl flex flex-col mx-auto">
            <h2 className="absolute top-0 text-sm tracking-wide -translate-y-1/2 left-1/2 -translate-x-1/2 text-davy bg-coolWhite px-2 py-1 rounded-full">
              Try it out now!
            </h2>
            {/*  */}

            <h2 className="text-[#050b1b]">
              With enough assistance & recursion, you can learn anything!
            </h2>

            <Link href={"/sign-up"} className="mx-auto mt-auto ">
              <Button className="text-lg bg-[#0C1A3C] hover:bg-[#050b1b] rounded-full font-bold">
                Start Now!
              </Button>
            </Link>
          </div>

          {/*  */}
          <div className="rounded-2xl flex flex-col items-center">
            <Image
              src={"/test-illust.png"}
              alt="Test Illustration"
              width={400}
              height={400}
              className="object-contain lg:-mr-20 lg:-mt-24"
            />

            <h2
              className={`${urbanist.className} font-bold text-center text-lightBlue`}
            >
              AI Based <br /> Recursive Tests
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
