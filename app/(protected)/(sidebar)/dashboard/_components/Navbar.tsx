import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 flex items-center gap-4 p-8 py-3 text-davy bg-coolWhite border-b-2 z-50">
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
    </div>
  );
}
