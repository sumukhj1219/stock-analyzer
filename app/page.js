"use client";
import React, { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import  FeaturesSection  from "@/components/FeatureSelection";
import Link from "next/link";
import { ChatBotCard } from "@/components/Chatbot";

export default function page() {
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{
    setMounted(true)
  }, [])
  return (
    mounted ?
    (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <div className="text-4xl font-semibold text-secondary">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 mb-2 text-secondary leading-none">
                <Cover className={'text-secondary'}>GuardianStocks</Cover>
              </span>
            </div>
          <Link href={'https://studious-adventure-qwpvj6qwqwr39v7g-8501.app.github.dev/'} className="m-3 w-1/2 p-4 bg-secondary flex items-center justify-center mx-auto rounded-full z-50 bg-gradient-to-r from-sky-400 to-purple-700 via-sky-800 outline-sky-700 text-lg hover:text-2xl text-secondary font-extrabold duration-1000 transition-all">Get Started <ArrowRight className="ml-2" /></Link>
          </>
        }>
          <Image
          src={`/trading.avif`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top brightness-75 hover:brightness-90 transition-all duration-300 w-full"
          draggable={false} />
        
      </ContainerScroll>
      <ChatBotCard />
      <FeaturesSection />
    </div>):(<div>Loading</div>)
  )
}
