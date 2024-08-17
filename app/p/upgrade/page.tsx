import { Album, Archive, Book, BookA, BookImage, BookOpen, BookText, Bot, Brain, BrainCog, Cloud, FileHeart, FileQuestion, GraduationCap, LibraryBig, Notebook, NotebookPen, Shapes } from "lucide-react";
import Image from "next/image";
import { paidFeatures } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Upgrade({ params }: { params: { test: string } }) {
    let fontSize = '56px'

    let iconSet = [
            <Book size={fontSize} className="upgradeBGIcon"/>,
            <Album size={fontSize} className="upgradeBGIcon"/>,
            <BookA size={fontSize} className="upgradeBGIcon"/>,
            <BookOpen size={fontSize} className="upgradeBGIcon"/>,
            <Notebook size={fontSize} className="upgradeBGIcon"/>,
            <LibraryBig size={fontSize} className="upgradeBGIcon"/>,
            <BookImage size={fontSize} className="upgradeBGIcon"/>,
            <NotebookPen size={fontSize} className="upgradeBGIcon"/>,
            <FileHeart size={fontSize} className="upgradeBGIcon"/>,
            <Brain size={fontSize} className="upgradeBGIcon"/>,
            <Bot size={fontSize} className="upgradeBGIcon"/>,
            <Cloud size={fontSize} className="upgradeBGIcon"/>,
            <Archive size={fontSize} className="upgradeBGIcon"/>,
            <BrainCog size={fontSize} className="upgradeBGIcon"/>,
            <FileQuestion size={fontSize} className="upgradeBGIcon"/>,
            <GraduationCap size={fontSize} className="upgradeBGIcon"/>,
            <BookText size={fontSize} className="upgradeBGIcon"/>,
            <Shapes size={fontSize} className="upgradeBGIcon"/>,
    ]




    let bgIcons = Array(8).fill(iconSet).flat()
    return (
      <div className="relative">
        <div className="flex flex-wrap text-fire justify-center items-center p-4 w-screen h-screen absolute top-0 left-0">
            <div className="w-[150%] h-[150%] -rotate-[20deg] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
                <Image src='/UpgradeBG.svg' layout="fill" objectFit="contain" objectPosition="center" alt="upgrade Background"/>
            </div>
        </div>
        <div className="z-[20] w-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-xl border-fire border-2">
            <div>Upgrade to Pro to enjoy unlimited generations and no limits.</div>
            <div className="w-full h-[1px] bg-fire my-2"></div>
            <div className="flex flex-col ">
                <div className="flex gap-2">
                        <div className="flex grow items-center gap-1">Features</div>
                        <div className="w-[1px] h-full bg-fire"></div>
                        <div className="w-20 p-2 text-center bg-gray-200 rounded-lg">Free</div>
                        <div className="w-[1px] h-full bg-fire"></div>
                        <div className="w-20 p-2 text-center bg-fire bg-opacity-50 rounded-lg text-white">Pro</div>
                </div>
                {paidFeatures.map((feature, index) => (
                    <div className="flex gap-2" key={index}>
                        <div className="flex grow items-center gap-1">{feature.feature}</div>
                        <div className="w-[1px] h-full bg-fire"></div>
                        <div className="w-20 p-2 text-center ">{feature.free}</div>
                        <div className="w-[1px] h-full bg-fire"></div>
                        <div className="w-20 p-2 text-center">{feature.paid}</div>
                    </div>
                ))}
                <Button className="w-[max-content] self-center mt-4 px-10">Upgrade</Button>
            </div>
        </div>
      </div>
    );
  }
  