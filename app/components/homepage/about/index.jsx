"use client";

import { useEffect, useRef, useState } from "react";
import { personalData } from "@/utils/data/personal-data";
// Inline SVGs — avoids loading react-icons/fa chunk on initial render
function AccessibilityIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z" />
    </svg>
  );
}
function RobotIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 640 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z" />
    </svg>
  );
}
import Image from "next/image";

const iconMap = {
  "flag-hu": (
    <span
      className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1a1443] flex-shrink-0"
      aria-hidden="true"
    >
      <img
        src="https://flagcdn.com/w20/hu.png"
        alt="Hungary flag"
        width={20}
        height={13}
        className="rounded-sm"
      />
    </span>
  ),
  accessibility: (
    <span
      className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/40 flex-shrink-0"
      aria-hidden="true"
    >
      <AccessibilityIcon size={16} className="text-green-400" />
    </span>
  ),
  ai: (
    <span
      className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-900/40 flex-shrink-0"
      aria-hidden="true"
    >
      <RobotIcon size={16} className="text-violet-400" />
    </span>
  ),
};

function AboutSection() {
  const [isColor, setIsColor] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (!isMobile) return;

    const currentRef = imgRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const toggleColor = () => setIsColor((prev) => !prev);

  return (
    <section id="about" className="my-12 lg:my-16 relative">
      <h2 className="sr-only">About Me</h2>
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span
          className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md"
          aria-hidden="true"
        >
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <h3 className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who am I?
          </h3>
          <div className="text-gray-200 text-sm lg:text-lg space-y-2">
            {personalData.description.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
          <h3 className="font-medium mt-8 mb-5 text-[#16f2b3] text-xl uppercase">
            What I bring?
          </h3>
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
          <button
            ref={imgRef}
            type="button"
            className={`rounded-lg transition-all duration-1000 cursor-pointer relative w-full max-w-sm aspect-square overflow-hidden border-0 bg-transparent p-0 ${
              isColor || inViewport
                ? "grayscale-0"
                : "grayscale hover:grayscale-0"
            }`}
            onClick={toggleColor}
            aria-label="Toggle profile color"
          >
            <Image
              src={personalData.profile}
              alt={`Profile picture of ${personalData.name}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) calc(100vw - 48px), 384px"
              priority
              quality={40}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
