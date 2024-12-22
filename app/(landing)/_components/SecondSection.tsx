import Image from "next/image";

export default function SecondSection() {
  return (
    <main className="min-h-screen bg-[url('https://img.freepik.com/free-vector/abstract-3d-art-background-holographic-floating-liquid-blobs-soap-bubbles-metaballs_1142-9279.jpg?t=st=1723626023~exp=1723629623~hmac=b69cd188c9e5e36ac828f4ef4c9a29b24e1ff41d3a810ddf352f3343838ca15a&w=2000')] bg-center bg-cover rotate-180 scale-x-[-1]">
      {/* Section 1 */}

      <div className="min-h-screen relative grid z-10 backdrop-blur-xl pt-24 rotate-180 scale-x-[-1] bg-gradient-to-b from-transparent via-blue-900 to-blue-800">
        <div className="max-w-5xl w-full h-full mx-auto p-4 flex flex-col gap-4">
          <div className="h-fit md:h-2/3 flex md:flex-row flex-col gap-4">
            <div className="flex flex-col min-h-80 min-w-60 gap-4 ">
              <div className="flex-1 bg-[url('https://www.creativefabrica.com/wp-content/uploads/2020/12/15/Flat-Illustration-People-are-studying3-Graphics-7187616-1-1-580x388.jpg')] bg-cover bg-center rounded-xl p-4"></div>
              <div className="flex-1 bg-[url('https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg')] bg-cover bg-center rounded-xl p-4"></div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex-1 group flex gap-4 justify-between bg-white rounded-xl p-4">
                <div>
                  <h2>The time is now.</h2>
                  <p>
                    It&apos;s never to late to start anything. <br /> Start now.{" "}
                    <br />
                    Progress early.
                  </p>
                </div>
                <img
                  src="https://img.freepik.com/free-vector/illustration-pen-icon_53876-5590.jpg"
                  alt="pen vector image"
                  className="group-hover:rotate-12 transition-all duration-500 mix-blend-multiply"
                  height={150}
                  width={150}
                />
              </div>
              <div className="grid flex-1 grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4 min-h-80 md:min-h-0">
                <div className="bg-[url('https://cdni.iconscout.com/illustration/premium/thumb/studying-illustration-download-in-svg-png-gif-file-formats--read-a-book-female-reader-women-daily-lifestyle-pack-people-illustrations-2900928.png')] bg-cover bg-center bg-white rounded-xl p-4"></div>
                <div className="bg-[url('https://img.freepik.com/free-vector/education-learning-concept-love-reading-people-reading-students-studying-preparing-examination-library-book-lovers-readers-modern-literature-flat-cartoon-vector-illustration_1150-60938.jpg?semt=ais_hybrid')] bg-center bg-contain bg-white bg-no-repeat rounded-xl p-4"></div>
              </div>
            </div>
            <div className="min-w-60 group relative overflow-hidden bg-white text-fire rounded-xl p-4">
              <h2>
                Unlock your potential, one flashcard at a time.
                {/*  */}
              </h2>
              <div className="hidden md:block absolute bottom-0 right-0 rounded-full bg-fire text-white translate-x-1/4 group-hover:-translate-x-1/3 group-hover:translate-y-1/4 transition-all duration-500 translate-y-1/3 h-60 aspect-square"></div>
            </div>
          </div>
          <div className="h-fit md:h-1/3 grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4">
          <div className="bg-white text-fire rounded-xl p-4 flex items-center justify-between">
            <div>
            <h2>Learn Faster</h2>
            <p>Our flashcards help you retain information quickly and efficiently.</p>
            </div>
            <img
            src="https://img.icons8.com/ios-filled/50/ff0000/fast-forward.png"
            alt="fast forward icon"
            className="h-12 w-12"
            />
          </div>
          <div className="bg-white text-fire rounded-xl p-4 flex items-center justify-between">
            <div>
            <h2>Stay Organized</h2>
            <p>Keep all your study materials in one place and track your progress.</p>
            </div>
          </div>
          <div className="bg-white text-fire rounded-xl p-4 flex items-center justify-between">
            <div>
            <h2>Achieve Your Goals</h2>
            <p>Set study goals and achieve them with our personalized flashcards.</p>
            </div>
            <img
            src="https://img.icons8.com/ios-filled/50/ff0000/goal.png"
            alt="goal icon"
            className="h-12 w-12"
            />
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
