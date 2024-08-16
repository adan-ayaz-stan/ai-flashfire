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
import { HTMLProps, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Paperclip, Sparkles } from "lucide-react";
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
import pdfToText from "react-pdftotext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  text: z.string().max(12000),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .optional()
    .nullable(),
});

function chunkText(longString: string) {
  // Split the long string into sentences based on the delimiter
  let sentences = longString.split(/[.!?]/);

  let chunks = [];
  let currentChunk = "";

  for (let sentence of sentences) {
    if ((currentChunk + sentence).length <= 1000) {
      currentChunk += sentence + ".";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + ".";
    }
  }

  // Push the remaining chunk
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

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
  const queryClient = useQueryClient();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const dropzone = {
    maxFiles: 1,
    maxSize: 0.5 * 1024 * 1024,
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
    const pdfText = values.files && (await pdfToText(values.files[0]));
    const nText = values.text;

    const valueText = pdfText || nText;

    // Generate text chunks of 500 characters
    const chunks = chunkText(valueText);

    toast.info("Possible flashcards to generate: " + chunks.length * 5);

    let generatedCardsLength = 0;

    toast.loading(
      `Generating flashcards... ${generatedCardsLength}/${chunks.length * 5}`,
      { id: "flashcards-generate" }
    );

    for (const chunk of chunks) {
      const response = await fetch("/api/flashcards/ai/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text_chunk: chunk,
          chapter_id: chapter_id,
        }),
      });
      const { generated, error } = await response.json();

      if (error) {
        toast.error(error);
        return;
      }

      generatedCardsLength += generated;

      toast.loading(
        `Generating flashcards... ${generatedCardsLength}/${chunks.length * 5}`,
        { id: "flashcards-generate" }
      );
    }

    toast.success("Flashcards generated successfully!", {
      id: "flashcards-generate",
    });
    await queryClient.invalidateQueries({
      queryKey: ["flashcard", "all", chapter_id],
    });

    dialogRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full md:w-fit">
        <Button variant={"red"} className="w-full">
          <Sparkles className="mr-2" /> Upload & Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-12">
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
                      <div className="flex items-center gap-4">
                        <FormLabel>Content</FormLabel>
                        <span className="ml-auto">{field.value.length}</span>
                      </div>
                      <FormControl>
                        <Textarea
                          className="max-h-80 min-h-40"
                          placeholder="History of the World"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your flashcards will be generated based on your content.
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
                        value={field.value ?? null}
                        onValueChange={field.onChange}
                        dropzoneOptions={dropzone}
                        reSelect={true}
                      >
                        <FileInput className="outline-dashed outline-1 outline-white">
                          <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                            <FileSvgDraw />
                          </div>
                        </FileInput>
                        {field.value &&
                          field.value.length > 0 &&
                          field.value.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span className="max-w-20 md:max-w-sm truncate">
                                {file.name}
                              </span>
                            </FileUploaderItem>
                          ))}
                      </FileUploader>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-black"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-black">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-black">PDF or TXT</p>
    </>
  );
};
