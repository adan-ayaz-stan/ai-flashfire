import { Button } from "@/components/ui/button";
import { TChapter } from "@/types/chapters";
import Link from "next/link";

export default function TestChapterLink({ data }: { data: TChapter }) {
  return (
    <div className="p-4 border-2 border-fire flex flex-col rounded-xl space-y-4">
      <h4>{data.title}</h4>
      <Button variant={"secondary"} className="ml-auto">
        Test Me
      </Button>
    </div>
  );
}
