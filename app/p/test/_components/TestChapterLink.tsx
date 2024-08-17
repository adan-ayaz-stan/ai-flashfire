import { Button } from "@/components/ui/button";
import { TChapter } from "@/types/chapters";
import Link from "next/link";
import { toast } from "sonner";

export default function TestChapterLink({ data }: { data: TChapter }) {
  return (
    <div className="min-w-60 p-4 border-2 border-fire bg-red-400 flex flex-col rounded-xl space-y-4">
      <h4>{data.title}</h4>
      <Link
        onClick={() =>
          toast.loading("Please wait while your test is created...", {
            id: "create-test",
            description: "You will be redirected to your test in a moment!",
          })
        }
        prefetch={false}
        href={"/api/test/chapter/" + data.id}
      >
        <Button variant={"secondary"} className="ml-auto">
          Test Me
        </Button>
      </Link>
    </div>
  );
}
