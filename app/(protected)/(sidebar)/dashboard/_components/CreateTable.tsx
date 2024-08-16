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
import { createTable } from "../../../../../server/actions/tables.action";
import { Loader } from "lucide-react";

const formSchema = z.object({
  table_name: z.string().min(2).max(50),
});

type TCreateTable = HTMLProps<HTMLFormElement>;

export default function CreateTable({
  //   onTableCreate,
  className,
  ...props
}: TCreateTable) {
  const dialogRef = useRef<HTMLButtonElement>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      table_name: "",
    },
  });

  const { mutateAsync: create, isPending } = useMutation({
    mutationKey: ["table", "create"],
    mutationFn: createTable,
    onMutate(vars: string) {
      toast.loading("Creating table " + vars, { id: "create-table" });
    },
    onError(error, variables, context) {
      toast.error("Error creating table " + variables, { id: "create-table" });
    },
    onSuccess(data, variables, context) {
      toast.success("Table created!", { id: "create-table" });
      dialogRef.current?.click();
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await create(values.table_name);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Create Table</Button>
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
              name="table_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Name</FormLabel>
                  <FormControl>
                    <Input placeholder="University Study" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name for your table. Your
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
