"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Loader, Paperclip, Sparkles } from "lucide-react";
import { createFlashcard } from "@/server/actions/flashcards.action";
import { DropzoneOptions } from "react-dropzone";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().max(300),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(5, {
      message: "Maximum 5 files are allowed",
    })
    .nullable(),
});

type TCreateFlashcard = HTMLProps<HTMLFormElement> & {
  chapter_id: string;
};

export default function CreateAIFlashcards({
  //   onChapterCreate,
  chapter_id,
  className,
  ...props
}: TCreateFlashcard) {
  const dialogRef = useRef<HTMLButtonElement>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const dropzone = {
    multiple: true,
    maxFiles: 3,
    maxSize: 4 * 1024 * 1024,
    accept: {
      // accept pdf or txt file
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
  } satisfies DropzoneOptions;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Sparkles className="mr-2" /> Upload & Generate
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
            <Tabs>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="file">Upload File</TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-80 min-h-40"
                          placeholder="What is 2 + 2?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your flashcard answer.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="file">
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <FormItem>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        dropzoneOptions={dropzone}
                        reSelect={true}
                      >
                        <FileInput
                          className={cn(
                            buttonVariants({
                              size: "icon",
                            }),
                            "size-8 w-full"
                          )}
                        >
                          <Paperclip className="size-4 mr-2" />
                          <p>Upload PDF or TXT File</p>
                          <span className="sr-only">Select your files</span>
                        </FileInput>
                        {field.value && field.value.length > 0 && (
                          <FileUploaderContent className="absolute bottom-8 p-2  w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 ">
                            {field.value.map((file, i) => (
                              <FileUploaderItem
                                key={i}
                                index={i}
                                aria-roledescription={`file ${
                                  i + 1
                                } containing ${file.name}`}
                                className="p-0 size-20"
                              >
                                <AspectRatio className="size-full">
                                  <Image
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="object-cover rounded-md"
                                    fill
                                  />
                                </AspectRatio>
                              </FileUploaderItem>
                            ))}
                          </FileUploaderContent>
                        )}
                      </FileUploader>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
