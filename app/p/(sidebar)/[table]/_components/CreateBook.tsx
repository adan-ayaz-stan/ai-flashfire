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
import { HTMLProps, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { createBook, getBooksCount } from "@/server/actions/books.action";
import PaidModal from "../../dashboard/_components/paidModal";
import { getSubscription } from "@/server/actions/queries.actions";

const formSchema = z.object({
  book_name: z.string().min(2).max(50),
});

type TCreateBook = HTMLProps<HTMLFormElement> & {
  table_id: string;
};

export default function CreateBook({
  //   onTableCreate,
  table_id,
  className,
  ...props
}: TCreateBook) {
  const dialogRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const { data: count } = useQuery({
    queryKey: ["book", "all", table_id, "count"],
    queryFn: () => getBooksCount(table_id),
  });

  const { data: subscription } = useQuery({
    queryKey: ["user", "subscription"],
    queryFn: () => getSubscription(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_name: "",
    },
  });

  const { mutateAsync: create, isPending } = useMutation({
    mutationKey: ["book", "create"],
    mutationFn: createBook,
    onMutate(vars) {
      toast.loading("Creating book " + vars.title, { id: "create-book" });
    },
    onError(error, variables, context) {
      toast.error("Error creating book " + variables.title, {
        id: "create-book",
      });
    },
    onSuccess(data, variables, context) {
      toast.success("Book created!", { id: "create-book" });
      dialogRef.current?.click();
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    await create({ title: values.book_name, table_id });
    await queryClient.invalidateQueries({
      queryKey: ["book", "all", table_id],
    });
  }

  if (count == undefined) {
    return null;
  }

  if (count && count >= 3 && !subscription) {
    return (
      <PaidModal featureRequest="You have reached the limit of 3 tables. Upgrade to unlock more features.">
        <Button variant="outline">Create Table</Button>
      </PaidModal>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Add Book</Button>
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
              name="book_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Name</FormLabel>
                  <FormControl>
                    <Input placeholder="University Study" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your display name for your book. Your collaborators
                    will see this when invited.
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
