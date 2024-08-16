"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLProps, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { createChapter } from "@/server/actions/chapters.action";
import { createFlashcard } from "@/server/actions/flashcards.action";

const formSchema = z.object({
  question: z.string().min(2).max(150),
  answer: z.string().min(2).max(300),
});

type TCreateFlashcard = HTMLProps<HTMLFormElement> & {
  chapter_id: string;
};

export default function CreateFlashcard({
  //   onChapterCreate,
  chapter_id,
  className,
  ...props
}: TCreateFlashcard) {
  const dialogRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const { mutateAsync: create, isPending } = useMutation({
    mutationKey: ["flashcard", "create"],
    mutationFn: createFlashcard,
    onMutate(vars) {
      toast.loading("Adding flashcard " + vars.question.slice(0, 10) + "...", {
        id: "create-flashcard",
      });
    },
    onError(error, variables, context) {
      toast.error(
        "Error creating flashcard " + variables.question.slice(0, 10) + "...",
        {
          id: "create-flashcard",
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success("Flashcard added!", { id: "create-flashcard" });
      dialogRef.current?.click();
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await create({
      question: values.question,
      answer: values.answer,
      chapter_id: chapter_id,
    });
    await queryClient.invalidateQueries({
      queryKey: ["flashcard", "all", chapter_id],
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full md:w-fit">
        <Button variant={"outline"} className="w-full">
          Add Flashcard
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose ref={dialogRef} className="hidden" />
        <Form {...form}>
          <form
            {...props}
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-8", className)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="What is 2 + 2?" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your flashcard question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="What is 2 + 2?" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your flashcard answer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              {isPending ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
