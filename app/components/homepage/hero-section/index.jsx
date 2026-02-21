"use client";
// @flow strict

import { useState, useEffect, useRef } from "react";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode, SiCodewars } from "react-icons/si";
import { TypeAnimation } from "react-type-animation";

function getResumePreviewUrl(url) {
  const match = url.match(/\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

function HeroSection() {
  const [showResume, setShowResume] = useState(false);
  const resumeTriggerRef = useRef(null);
  const resumeCloseRef = useRef(null);

  // Focus close button when modal opens; return focus when it closes
  useEffect(() => {
    if (showResume) {
      resumeCloseRef.current?.focus();
    } else {
      resumeTriggerRef.current?.focus();
    }
  }, [showResume]);

  // Close modal on Escape key
  useEffect(() => {
    if (!showResume) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowResume(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showResume]);

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is <span className=" text-pink-500">{personalData.name}</span>
            {`, I'm a `}
            <TypeAnimation
              sequence={[
                "Senior Software Test Automation Engineer",
                1500,
                "Test Automation Architect",
                1500,
                "CI/CD Integration Specialist",
                1500,
                "Accessibility Testing Advocate",
                1500,
                "Senior SDET",
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="text-[#16f2b3]"
              repeat={Infinity}
            />
          </h1>

          <p className="mt-4 text-sm text-gray-400 italic lg:text-base">
            &quot;9+ years turning manual chaos into automated confidence.&quot;
          </p>

          <div className="my-8 flex items-center gap-5">
            <Link
              href={personalData.github}
              target="_blank"
              aria-label="GitHub profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={30} aria-hidden="true" />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              aria-label="LinkedIn profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={30} aria-hidden="true" />
            </Link>
            <Link
              href={personalData.leetcode}
              target="_blank"
              aria-label="LeetCode profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <SiLeetcode size={30} aria-hidden="true" />
            </Link>
            <Link
              href={personalData.codeWars}
              target="_blank"
              aria-label="Codewars profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <SiCodewars size={30} aria-hidden="true" />
            </Link>
            <Link
              href={personalData.whatsApp}
              target="_blank"
              aria-label="Contact on WhatsApp"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsWhatsapp size={30} aria-hidden="true" />
            </Link>
          </div>

          {/* Stats Counter Bar */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
            <div className="rounded-lg border border-[#1b2c68a0] bg-[#0d1224] px-4 py-3 text-center">
              <span className="block text-2xl font-bold text-[#16f2b3]">
                9+
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Years Exp.
              </span>
            </div>
            <div className="rounded-lg border border-[#1b2c68a0] bg-[#0d1224] px-4 py-3 text-center">
              <span className="block text-2xl font-bold text-[#16f2b3]">
                5+
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Frameworks
              </span>
            </div>
            <div className="rounded-lg border border-[#1b2c68a0] bg-[#0d1224] px-4 py-3 text-center">
              <span className="block text-2xl font-bold text-[#16f2b3]">2</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Countries
              </span>
            </div>
            <div className="rounded-lg border border-[#1b2c68a0] bg-[#0d1224] px-4 py-3 text-center">
              <span className="block text-2xl font-bold text-[#16f2b3]">
                CI/CD
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Integrated
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
            >
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} aria-hidden="true" />
              </button>
            </Link>

            <button
              ref={resumeTriggerRef}
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              onClick={() => setShowResume(true)}
              aria-haspopup="dialog"
            >
              <span>Get Resume</span>
              <MdDownload size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] overflow-hidden min-w-0"
          aria-hidden="true"
        >
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">qaEngineer</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{"{"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Vignesh Ambalam Suresh</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">role:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">
                  Senior Software Test Automation Engineer/ SDET
                </span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  experience:
                </span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">9+ years</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className=" text-white">languages:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">Java</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">JavaScript</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">TypeScript</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Python - Basics</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className=" text-white">frameworks:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">Playwright</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Selenium</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Cypress</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">REST Assured</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className=" text-white">cicd:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">Jenkins</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">GitHub Actions</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              {/* NEW FIELDS START HERE */}
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  specialities:
                </span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">AI-Augmented QA</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Accessibility (WCAG)</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">AI Generated Tests</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">aiTooling:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">MCP Agents</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">LLM-Assisted Scripting</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Prompt Engineering</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              {/* NEW FIELDS END HERE */}
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  accessibilityAdvocate:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  cicdConfigured:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  agileTeamPlayer:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">
                  bugFinder:
                </span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{"() {"}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">
                  return
                </span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">experience</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">9</span>
                <span className="text-amber-300"> &amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">frameworks.length</span>
                <span className="mr-2 text-amber-300">&gt;</span>
                <span className="text-orange-400">7</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span>
              </div>
              <div>
                <span className="text-gray-400">{`};`}</span>
              </div>
            </code>
          </div>
        </div>
      </div>

      {showResume && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowResume(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="resume-modal-title" className="sr-only">
              Resume Preview
            </h2>
            <div className="w-full flex justify-end gap-3 mb-3">
              <a
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-2 text-sm font-medium text-white no-underline transition-all duration-200 ease-out hover:from-violet-600 hover:to-pink-500"
                aria-label="Download resume (opens in new tab)"
              >
                <MdDownload size={16} aria-hidden="true" />
                <span>Download</span>
              </a>
              <button
                ref={resumeCloseRef}
                onClick={() => setShowResume(false)}
                className="flex items-center gap-1 rounded-full bg-[#1a1443] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-pink-600"
                aria-label="Close resume preview"
              >
                ✕ Close
              </button>
            </div>
            <div
              className="w-full rounded-lg overflow-hidden"
              style={{ height: "80vh" }}
            >
              <iframe
                src={getResumePreviewUrl(personalData.resume)}
                className="w-full h-full rounded-lg"
                title={`Resume of ${personalData.name}`}
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;
