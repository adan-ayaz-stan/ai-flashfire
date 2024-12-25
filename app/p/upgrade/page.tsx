import {
  Album,
  Archive,
  Book,
  BookA,
  BookImage,
  BookOpen,
  BookText,
  Bot,
  Brain,
  BrainCog,
  Cloud,
  FileHeart,
  FileQuestion,
  GraduationCap,
  LibraryBig,
  Notebook,
  NotebookPen,
  Shapes,
} from "lucide-react";
import Image from "next/image";
import { paidFeatures } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/server/actions/queries.actions";
import Pricing from "./_components/Pricing";
import Navbar from "@/app/(landing)/_components/Navbar";
import Link from "next/link";

export default async function Upgrade() {
  const [products, subscription] = await Promise.all([
    getProducts(),
    getSubscription(),
  ]);

  return (
    <div className="relative p-4 md:p-8 bg-[url('/UpgradeBG.svg')] bg-cover bg-center bg-opacity-70 min-h-screen">
      <div className="z-[20]  max-w-7xl mx-auto bg-white bg-[url('https://img.freepik.com/free-vector/flat-design-red-polka-dot-background_23-2149529614.jpg?semt=ais_hybrid')] bg-repeat p-4 rounded-xl border-fire border-2">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="text-white"></div>
          <Link href={"/p/dashboard"}>
            <Button variant={"red"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="mr-2"
              >
                <path
                  fill="#ffffff"
                  d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"
                />
              </svg>{" "}
              Go Home
            </Button>
          </Link>
        </div>
        <div className="w-full h-[1px] bg-fire my-2"></div>
        <div className="flex flex-col ">
          <Pricing products={products ?? []} subscription={subscription} />
        </div>
      </div>
    </div>
  );
}
