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
      <div className="z-[20]  max-w-7xl mx-auto bg-white p-4 rounded-xl border-fire border-2">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div>
            Upgrade to Pro to enjoy unlimited generations and no limits.
          </div>
          <Link href={"/p/dashboard"}>
            <Button variant={"red"}>Go Home</Button>
          </Link>
        </div>
        <div className="w-full h-[1px] bg-fire my-2"></div>
        <div className="flex flex-col ">
          {/* <div className="flex gap-2" key={"heading"}>
            <div className="flex grow items-center gap-1">Features</div>
            <div className="w-[1px] h-full bg-fire"></div>
            <div className="w-20 p-2 text-center bg-gray-200 rounded-lg">
              Free
            </div>
            <div className="w-[1px] h-full bg-fire"></div>
            <div className="w-20 p-2 text-center bg-fire bg-opacity-50 rounded-lg text-white">
              Pro
            </div>
          </div>
          {paidFeatures.map((feature, index) => (
            <div className="flex gap-2" key={index}>
              <div className="flex grow items-center gap-1">
                {feature.feature}
              </div>
              <div className="w-[1px] h-full bg-fire"></div>
              <div className="w-20 p-2 text-center ">{feature.free}</div>
              <div className="w-[1px] h-full bg-fire"></div>
              <div className="w-20 p-2 text-center">{feature.paid}</div>
            </div>
          ))}
          <Button className="w-[max-content] self-center mt-4 px-10">
            Upgrade
          </Button> */}

          <Pricing products={products ?? []} subscription={subscription} />
        </div>
      </div>
    </div>
  );
}
