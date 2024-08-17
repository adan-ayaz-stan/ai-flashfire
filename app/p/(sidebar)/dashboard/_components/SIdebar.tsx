import { Flame, LayoutDashboard, TestTubeIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden md:block w-72 h-full border-r-2 fixed top-0 left-0 p-8 py-3 pt-20 text-davy bg-coolWhite border-fire z-40 overflow-x-hidden scrollbar-none space-y-0">
      <Link
        href={"/p/dashboard"}
        className="p-4 rounded-md flex items-center gap-2 text-red-500 tracking-widest h-12 hover:bg-red-100 transition-all duration-500"
      >
        <LayoutDashboard className="h-6 w-6" /> <h3>Dashboard</h3>
      </Link>

      <Link
        href={"/p/test"}
        className="p-4 rounded-md flex items-center gap-2 text-red-500 tracking-widest h-12 hover:bg-red-100 transition-all duration-500"
      >
        <TestTubeIcon className="h-6 w-6" /> <h3>Tests</h3>
      </Link>

      {/*  */}
      <Flame className="absolute bottom-20 right-0 w-80 h-80 scale-150 -mr-20 text-red-300" />
    </div>
  );
}
