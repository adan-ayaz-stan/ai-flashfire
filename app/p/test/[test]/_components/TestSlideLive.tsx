"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { TTest } from "@/types/tests";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Keyboard } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { MultiStepLoader } from "@/components/multi-step-loader";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.array(
  z.object({
    question: z.string().optional(),
    answer: z.string(),
  })
);

export default function TestSlideLive({ data }: { data: TTest }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: [],
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setCorrectAnswers(0);

    // Values are in the form of {0: {}, 1: {}, 2: {}}
    // Convert to an array of objects: [{}, {}, {}]
    const valuesArray = Object.entries(values).map(([key, value]) => ({
      question: value.question,
      answer: value.answer,
    }));

    console.log("Submitting!");

    // Find correct answers
    valuesArray.forEach(async (value) => {
      // Find question from data
      const question = data.test_questions.find(
        (question) => question.question === value.question
      );

      // Check if answer is correct
      if (question?.answer === value.answer) {
        setCorrectAnswers((prev) => prev + 1);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  }

  return (
    <Form {...form}>
      <form className="min-h-screen" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="fixed top-4 text-center w-full">{data.title}</h2>
        <Link href={"/p/test"}>
          <Button variant={"outline"} className="absolute top-4 left-4 z-50">
            Back
          </Button>
        </Link>

        {isSubmitting && (
          <MultiStepLoader
            loadingStates={data.test_questions.map((ele) => {
              return { text: ele.question };
            })}
            loading
            loop={false}
            duration={1000}
            percentage={(correctAnswers / data.test_questions.length) * 100}
          />
        )}

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation, Keyboard]}
          keyboard={{
            enabled: true,
          }}
          slideNextClass="scale-90"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data.test_questions.map((question, i) => {
            const options = [question.answer, ...question.wrong_options];
            // randomize options
            options.sort(() => Math.random() - 0.5);

            return (
              <SwiperSlide key={question.answer} className="min-h-screen">
                <div className="h-screen relative flex flex-col items-center justify-center px-16">
                  {/* Slide Count / Total */}
                  <div className="absolute bottom-4 right-4">
                    <h3>
                      Question {i + 1} / {data.test_questions.length}
                    </h3>
                  </div>

                  {/*  */}

                  <FormField
                    name={`${i}.question`}
                    defaultValue={question.question}
                    control={form.control}
                    render={() => <></>}
                  />
                  <FormField
                    control={form.control}
                    name={`${i}.answer`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          <h1 className="text-3xl font-bold">
                            {question.question}
                          </h1>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {options.map((option) => (
                              <FormItem
                                key={option}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    className="text-white"
                                    value={option}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    "font-normal text-xl p-2 text-white rounded-md w-full cursor-pointer hover:bg-red-300 transition-all duration-300",
                                    field.value === option &&
                                      "bg-red-400 hover:bg-red-400"
                                  )}
                                >
                                  {option}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </SwiperSlide>
            );
          })}
          <SwiperSlide className="min-h-screen">
            <div className="h-screen relative flex flex-col items-center justify-center">
              <h2>Submit your test!</h2>
              <Button
                onClick={() => onSubmit(form.getValues())}
                type="button"
                className="text-lg mt-4"
                variant={"red"}
              >
                Yes, I&apos;m done!
              </Button>
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
    </Form>
  );
}
