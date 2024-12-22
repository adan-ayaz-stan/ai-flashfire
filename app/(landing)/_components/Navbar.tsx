import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <div className="hidden md:block space-x-3">
        <Link href={"/pricing"}>
          <Button
            variant={"link"}
            className="text-white/80 text-md hover:text-white"
          >
            Pricing
          </Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button
            variant={"link"}
            className="text-white/80 text-md hover:text-white"
          >
            Sign Up
          </Button>
        </Link>
        <Link href={"/sign-in"}>
          <Button className="h-9 px-4 text-md bg-white text-[#0C1A3C] hover:text-white rounded-full">
            Sign In
          </Button>
        </Link>
      </div>

      <Dialog>
        <DialogTrigger className="md:hidden">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3.464 20.536C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535M18.75 16a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75M18 12.75a.75.75 0 0 0 0-1.5H6a.75.75 0 0 0 0 1.5zM18.75 8a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75"
              clip-rule="evenodd"
            />
          </svg>
        </DialogTrigger>
        <DialogContent className="bg-davy text-white w-4/5 rounded-2xl">
        <Link href={"/pricing"} className="w-full">
              <Button
                variant={"link"}
                className="w-full text-white/80 text-md hover:text-white"
              >
                Pricing
              </Button>
            </Link>
            <Link href={"/sign-up"} className="w-full">
              <Button
                variant={"link"}
                className="w-full text-white/80 text-md hover:text-white"
              >
                Sign Up
              </Button>
            </Link>
            <Link href={"/sign-in"} className="w-full">
              <Button className="w-full h-9 px-4 text-md bg-white text-[#0C1A3C] hover:text-white rounded-full">
                Sign In
              </Button>
            </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
