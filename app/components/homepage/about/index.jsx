// @flow strict
"use client";

import { useEffect, useRef, useState } from "react";
import { personalData } from "@/utils/data/personal-data";
import { FaUniversalAccess, FaRobot } from "react-icons/fa";

const iconMap = {
  "flag-hu": (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1a1443] flex-shrink-0" aria-hidden="true">
      <img src="https://flagcdn.com/w20/hu.png" alt="Hungary flag" width={20} height={13} className="rounded-sm" />
    </span>
  ),
  "accessibility": (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/40 flex-shrink-0" aria-hidden="true">
      <FaUniversalAccess size={16} className="text-green-400" />
    </span>
  ),
  "ai": (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-900/40 flex-shrink-0" aria-hidden="true">
      <FaRobot size={16} className="text-violet-400" />
    </span>
  ),
};

function AboutSection() {
  const [isColor, setIsColor] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (!isMobile || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <h2 className="sr-only">About Me</h2>
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md" aria-hidden="true">
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
          <ul className="text-gray-200 text-sm lg:text-lg list-none space-y-4">
            {personalData.whatIBring.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                {iconMap[point.icon]}
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <img
            ref={imgRef}
            src={personalData.profile}
            alt="Vignesh Ambalam Suresh"
            className={`rounded-lg transition-all duration-1000 cursor-pointer ${
              isColor || inViewport ? "grayscale-0" : "grayscale hover:grayscale-0"
            }`}
            onClick={() => setIsColor((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
