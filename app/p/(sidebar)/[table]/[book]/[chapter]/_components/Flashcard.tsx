import { TFlashcard } from "@/types/flashcards";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Flashcard({
  data,
  questionClassName,
}: {
  data: TFlashcard;
  questionClassName?: string;
}) {
  const [isReveal, setReveal] = useState(false);

  function toggleReveal() {
    setReveal((value) => !value);
  }

  return (
    <div
      onClick={toggleReveal}
      className="min-w-80 max-w-sm min-h-60 max-h-80 flex flex-col p-4 relative cursor-pointer"
    >
      <motion.div className="absolute max-h-80 overflow-y-auto scrollbar-none top-2 right-2 flex w-full h-full bg-coolWhite text-davy rounded-xl px-4">
        {/*  */}
        <h4 className="m-auto text-center">{data.answer}</h4>
        {/*  */}
        <motion.div
          animate={{
            opacity: isReveal ? 0 : 1,
            scale: isReveal ? 1 : [0, 1],
            y: isReveal ? [0, 50] : 0,
          }}
          className={cn(
            "absolute top-0 left-0 flex w-full h-full bg-fire rounded-xl z-10 p-4 text-white",
            questionClassName
          )}
        >
          <h3 className="m-auto text-center tracking-wider">{data.question}</h3>
        </motion.div>
        {/*  */}
      </motion.div>
    </div>
  );
}
