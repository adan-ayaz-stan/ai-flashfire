import Link from "next/link";
import Navbar from "../_components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  { feature: "Table Creation Limit", free: "3", paid: "No Limit" },
  { feature: "Book Creation Limit", free: "3", paid: "No Limit" },
  { feature: "Chapter Creation Limit", free: "5", paid: "No Limit" },
  { feature: "AI Flashcard Generation Limit", free: "5", paid: "No Limit" },
  { feature: "Test Creation Limit", free: "3", paid: "No Limit" },
  { feature: "Support Priority", free: "Standard", paid: "High" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-davy text-white bg-[url('https://img.freepik.com/free-vector/abstract-3d-art-background-holographic-floating-liquid-blobs-soap-bubbles-metaballs_1142-9279.jpg?t=st=1723626023~exp=1723629623~hmac=b69cd188c9e5e36ac828f4ef4c9a29b24e1ff41d3a810ddf352f3343838ca15a&w=2000')] bg-center bg-cover">
      <div className="min-h-screen backdrop-blur-xl p-4 pt-24 flex items-center justify-center flex-col">
        <Navbar />

        <Table className="w-full max-w-xl mx-auto bg-davy rounded-xl mb-8">
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-sm"></TableHead>
              <TableHead className="w-[200px] text-white">
                <h3>Free</h3>
              </TableHead>
              <TableHead className="w-[200px] font-bold text-fire">
                <h3>Pro</h3>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feat) => (
              <TableRow key={feat.feature} className="hover:bg-gray-700">
                <TableCell className="font-medium">{feat.feature}</TableCell>
                <TableCell>{feat.free}</TableCell>
                <TableCell>{feat.paid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h2 className="text-center">
           Please contact{" "}
          <Link
            href={"mailto:adanayaztracer@gmail.com"}
            className="font-bold text-fire underline"
            title="adanayaztracer@gmail.com"
          >
            Spitfire
          </Link>{" "}
          to upgrade manually.
        </h2>
      </div>
    </div>
  );
}
