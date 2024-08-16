import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 flex items-center gap-4 p-8 py-3 text-davy bg-coolWhite border-b-2 border-fire z-50">
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

      <Link
        href={"/"}
        className="p-4 rounded-md flex items-center gap-2 text-red-500 tracking-widest h-8 hover:bg-red-100 transition-all duration-500"
      >
        <UserIcon className="h-6 w-6" /> <h3>Profile</h3>
      </Link>

      <SignOutButton>
        <Button
          className="rounded-md items-center gap-2 bg-red-500 tracking-widest h-12 hover:bg-red-400 text-white font-bold transition-all duration-500"
          type="button"
        >
          <h3>Log out</h3>
        </Button>
      </SignOutButton>
    </div>
  );
}
