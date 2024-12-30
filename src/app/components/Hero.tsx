import React from "react";
import { Bagel_Fat_One } from "next/font/google";

const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
});

const Hero: React.FC = () => {
  return (
    <div className="flex justify-end items-center h-[50vh] flex-end flex-col mx-5 mb-10 text-center">
      <h3 className="opacity-50 text-base lg:text-xl">
        Music Knows No Barriers
      </h3>
      <h1 className={bagelFatOne.className + " text-7xl lg:text-9xl mb-5"}>
        LingoAI
      </h1>
      <h3 className="text-xl lg:text-2xl text-center">
        Translate Any Song To Any Language
      </h3>
    </div>
  );
};

export default Hero;
