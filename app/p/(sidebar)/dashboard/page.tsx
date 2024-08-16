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
    <>
      {/* Action Bar */}
      <div className="w-full flex items-center mb-4">
        <h2 className="mr-auto">Tables</h2>

        {/*  */}
        <CreateTable />
      </div>

      {/* Cards */}
      <AllTables />
    </>
  );
}
