import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full fixed max-w-xl top-0 md:top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 p-8 py-3 md:rounded-full text-white  bg-[rgba(12,26,60,0.8)] z-50">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2 mr-auto">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
        <h2 className="tracking-wide uppercase">
          Flash<span className="text-fire">firE</span>
        </h2>
      </Link>

      {/* Navigation Links */}
      <Link href={"/sign-up"}>
        <Button variant={"link"} className="text-white text-md hover:text-gray-200">Sign Up</Button>
      </Link>
      <Link href={"/sign-in"}>
      <Button className="h-9 px-4 text-md bg-white text-[#0C1A3C] hover:bg-[#0A142A] hover:text-white rounded-full">Sign In</Button>
      </Link>
    </div>
  );
}
