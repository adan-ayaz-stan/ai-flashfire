import { Button } from "@/components/ui/button";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/SIdebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateTable from "./_components/CreateTable";
import { toast } from "sonner";
import Table from "./_components/Table";
import AllTables from "./_components/AllTables";

export default function Dashboard() {
  return (
    <div className="min-h-screen pl-72">
      <Navbar />

      <Sidebar />

      <div className="border-2 border-black min-h-screen p-4 pt-20 space-y-4">
        {/* Action Bar */}
        <div className="w-full flex items-center">
          <h2 className="mr-auto">Tables</h2>

          {/*  */}
          <CreateTable />
        </div>

        {/* Cards */}
        <AllTables />
      </div>
    </div>
  );
}
