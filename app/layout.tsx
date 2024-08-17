import type { Metadata } from "next";
import { Dosis, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./providers";

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Flashfire",
  description:
    "Discover the power of spaced repetition, gamification, and personalized learning. Master any subject with our intelligent flashcard app, featuring spaced repetition, gamification, and personalized learning. Start learning today!",
  keywords:
    "artificial intelligence, flashcards, learning app, education technology, study aid, digital flashcards, spaced repetition, gamification, personalized learning, adaptive learning, intelligent flashcards, ai powered, memory aid, exam prep, knowledge retention, learning companion, study smarter, ai flashfire, flashfire, ai flashcard app, intelligent flashcard system, adaptive learning tool, personalized study companion, ai powered learning aid, digital education solution, study smarter app, knowledge retention tool, exam prep flashcards, learn faster, learn smarter, education app, learning software, flashcard game, quiz app, trivia game, brain training, cognitive learning, educational technology, edtech, online learning, elearning, mobile learning, mlearning, ai in education, machine learning, natural language processing, nlp, text to speech, speech recognition, ai assistant, virtual learning, augmented learning, adaptive technology, personalized education, student engagement, learning outcomes, educational games, interactive learning, immersive learning, gamified learning, social learning, collaborative learning, mobile education, education on the go, anywhere learning, anytime learning, self paced learning, ai tutor, virtual tutor, personalized tutor, adaptive tutor, intelligent tutor, ai powered tutor, educational software, learning platform, educational platform, learning management system, lms, ai powered lms, adaptive lms, personalized lms, intelligent lms, educational apps, learning apps, education software, learning software, edtech apps, education technology apps, learning technology apps, ai powered apps, adaptive apps, personalized apps, intelligent apps, educational games apps, learning games apps, brain training apps, cognitive learning apps, educational tools, learning tools, ai powered tools",
  robots: "index, follow",
  authors: [{ name: "Spitfire Kasnoviz", url: "https://adanayaz.com" }],
  openGraph: {
    title: "AI Flashfire",
    description:
      "Discover the power of spaced repetition, gamification, and personalized learning. Master any subject with our intelligent flashcard app, featuring spaced repetition, gamification, and personalized learning. Start learning today!",
    url: "https://flashfire.vercel.app/",
    siteName: "AI Flashfire",
    images: [
      {
        url: "https://res.cloudinary.com/ddfjwg2rb/image/upload/v1723586995/My%20Uploads/Portfolio%20Projects/AI%20Flashfire/seo-image.jpg", // Must be an absolute URL
        width: 800,
        height: 600,
        alt: "AI Flashfire | Flashcard & Tests at ease",
      },
      {
        url: "https://res.cloudinary.com/ddfjwg2rb/image/upload/v1723586995/My%20Uploads/Portfolio%20Projects/AI%20Flashfire/seo-image.jpg", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "AI Flashfire | Flashcard & Tests at ease",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <ClerkProvider>
          <body className={dosis.className} suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Analytics />
              <Toaster />
            </ThemeProvider>
          </body>
        </ClerkProvider>
      </Providers>
    </html>
  );
}
