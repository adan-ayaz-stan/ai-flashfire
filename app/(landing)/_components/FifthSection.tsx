import { Button } from "@/components/ui/button";

export default function FifthSection() {
  return (
    <div className="min-h-screen pt-24 bg-blue-600 text-white">
      <div className="max-w-5xl w-full h-full mx-auto p-4">
        <section className="text-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1>Get in touch with us!</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Have questions or need assistance? We&apos;re here to help!
                Reach out to our team, and we&apos;ll make sure you get the
                support you need to achieve your learning goals.
              </p>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label htmlFor="email" className="leading-7 text-sm text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <Button variant={"outline"} className="border-none">
                Send
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
