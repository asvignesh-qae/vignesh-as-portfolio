// @flow strict
"use client";

import { useState } from "react";
import { personalData } from "@/utils/data/personal-data";

function AboutSection() {
  const [isColor, setIsColor] = useState(false);

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <div className="text-gray-200 text-sm lg:text-lg space-y-2">
            {personalData.description.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
          <p className="font-medium mt-8 mb-5 text-[#16f2b3] text-xl uppercase">
            What I bring?
          </p>
          <ul className="text-gray-200 text-sm lg:text-lg list-none space-y-3">
            {personalData.whatIBring.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <img
            src={personalData.profile}
            alt="Vignesh Ambalam Suresh"
            className={`rounded-lg transition-all duration-1000 cursor-pointer ${
              isColor ? "grayscale-0" : "grayscale hover:grayscale-0"
            }`}
            onClick={() => setIsColor((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
