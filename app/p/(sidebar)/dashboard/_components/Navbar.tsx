"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSubscription } from "@/server/actions/queries.actions";
import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Crown, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: subscription } = useQuery({
    queryKey: ["user", "subscription"],
    queryFn: () => getSubscription(),
  });

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
      {!subscription && (
        <Link
          href={"/p/upgrade"}
          className="hidden p-4 rounded-md md:flex items-center gap-2 text-red-500 tracking-widest h-8 hover:bg-red-100 transition-all duration-500"
        >
          <Crown className="h-6 w-6" /> <h3>Upgrade</h3>
        </Link>
      )}

      <Link
        href={"/p/profile"}
        className="hidden md:flex p-4 rounded-md items-center gap-2 text-red-500 tracking-widest h-8 hover:bg-red-100 transition-all duration-500"
      >
        <UserIcon className="h-6 w-6" /> <h3>Profile</h3>
      </Link>

      <SignOutButton>
        <Button
          className="hidden md:block rounded-md items-center gap-2 bg-red-500 tracking-widest h-12 hover:bg-red-400 text-white font-bold transition-all duration-500"
          type="button"
        >
          <h3>Log out</h3>
        </Button>
      </SignOutButton>
      <Dialog>
        <DialogTrigger className="md:hidden">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M21 18H3v-2h18v2Zm0-5H3v-2h18v2Zm0-5H3V6h18v2Z"
              />
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] rounded-sm">
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
          {!subscription && (
            <Link
              href={"/p/upgrade"}
              className="p-4 rounded-md flex items-center gap-2 text-red-500 tracking-widest h-8 hover:bg-red-100 transition-all duration-500"
            >
              <Crown className="h-6 w-6" /> <h3>Upgrade</h3>
            </Link>
          )}

          <Link
            href={"/p/profile"}
            className="flex p-4 rounded-md items-center gap-2 text-red-500 tracking-widest h-8 hover:bg-red-100 transition-all duration-500"
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
