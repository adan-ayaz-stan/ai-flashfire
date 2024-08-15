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
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { createChapter } from "@/server/actions/chapters.action";

const formSchema = z.object({
  chapter_name: z.string().min(2).max(50),
});

type TCreateChapter = HTMLProps<HTMLFormElement> & {
  book_id: string;
};

export default function CreateChapter({
  //   onChapterCreate,
  book_id,
  className,
  ...props
}: TCreateChapter) {
  const dialogRef = useRef<HTMLButtonElement>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapter_name: "",
    },
  });

  const { mutateAsync: create, isPending } = useMutation({
    mutationKey: ["chapter", "create"],
    mutationFn: createChapter,
    onMutate(vars) {
      toast.loading("Adding chapter " + vars.title, { id: "create-chapter" });
    },
    onError(error, variables, context) {
      toast.error("Error creating chapter " + variables.title, {
        id: "create-chapter",
      });
    },
    onSuccess(data, variables, context) {
      toast.success("Chapter added!", { id: "create-chapter" });
      dialogRef.current?.click();
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await create({ title: values.chapter_name, book_id });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Chapter</Button>
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
              name="chapter_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="University Study" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your display name for your chapter. Your
                    collaborators will see this when invited.
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