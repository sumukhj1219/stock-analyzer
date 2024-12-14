
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/3D-card";
import Link from "next/link";

const items = [
  {
    id: "1",
    image: "/buy-sell.avif",
    label: "Buy Sell Signals",
    description: "Get accurate buy and sell signals for your trades.",
  },
  {
    id: "2",
    image: "/trend-analysis.jpg",
    label: "Trend Prediction",
    description: "Predict the accurate trends for your trades.",
  },
  {
    id: "3",
    image: "/analysis.avif",
    label: "Stock Analytics",
    description: "Gain insights from advanced market analytics.",
  },
  {
    id: "4",
    image: "/chat-bot.jpg",
    label: "Integrated chatbot",
    description: "Gain knowledge of any stock from our crypto guru.",
  },
  {
    id: "5",
    image: "/news-image.jpg",
    label: "Popular news insights.",
    description: "Get news regarding stocks.",
  },
  {
    id: "6",
    image: "/volume.jpg",
    label: "Volume Insights",
    description: "Gain insights from advanced market analytics.",
  },
 
 
];

const FeatureSelection = () => {
  return (
    <div className="max-w-7xl grid grid-cols-3 gap-y-1 gap-x-60 mx-auto">
      {items.map((card) => (
         <CardContainer key={card.id} className="">
         <CardBody className="bg-neutral-950 shadow-md shadow-neutral-600 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
           <CardItem
             translateZ="50"
             className="text-3xl font-bold text-secondary dark:text-white"
           >
            {card.label}
           </CardItem>
           <CardItem translateZ="100" className="w-full mt-4">
             <Image
               src={card.image}
               height="1000"
               width="1000"
               className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
               alt="thumbnail"
             />
           </CardItem>
           <div className="flex justify-between items-center mt-20">
             <CardItem
               translateZ={20}
               className="px-4 py-2 rounded-xl text-xl bg-black dark:bg-white dark:text-black text-white font-bold"
             >
               {card.description}
             </CardItem>
           </div>
         </CardBody>
       </CardContainer>
      ))}
    </div>
  );
};

export default FeatureSelection;
