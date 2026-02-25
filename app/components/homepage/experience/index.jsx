// @flow strict
"use client"

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <h2 className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experience
          </h2>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map(exp => (
                  <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                    <button
                      className="p-3 relative w-full text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16f2b3] rounded-t-lg"
                      onClick={() => handleToggle(exp.id)}
                      aria-expanded={expandedId === exp.id}
                      aria-controls={`exp-details-${exp.id}`}
                    >
                      <Image
                        src="/blur-23.svg"
                        alt=""
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {exp.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125" aria-hidden="true">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {exp.title}
                          </p>
                          <p className="text-sm sm:text-base">
                            {exp.company}
                          </p>
                        </div>
                        <div className="ml-auto text-violet-500 transition-transform duration-300" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${expandedId === exp.id ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </button>
                    <div
                      id={`exp-details-${exp.id}`}
                      className={`overflow-hidden transition-all ease-in-out ${
                        expandedId === exp.id ? 'max-h-[2000px] opacity-100 duration-500' : 'max-h-0 opacity-0 duration-200'
                      }`}
                    >
                      {exp.bullets && (
                        <ul className="px-6 pb-5 space-y-3">
                          {exp.bullets.map((bullet, index) => (
                            <li
                              key={index}
                              className="text-sm sm:text-base text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-[#16f2b3] mt-1.5 min-w-[6px]" aria-hidden="true">&#8226;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
