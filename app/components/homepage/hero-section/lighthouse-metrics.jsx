"use client";

import React, { useEffect, useState } from "react";

const LighthouseRing = ({ score, label }) => {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    // Small timeout to allow transition to run on mount
    const timer = setTimeout(() => {
      setCurrentScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const isPerfect = score === 100;
  const isGood = score >= 90 && score < 100;
  const isNeedsImprovement = score >= 50 && score < 90;

  let colorClass = "text-red-500";
  let strokeClass = "stroke-red-500";

  if (isPerfect || isGood) {
    colorClass = "text-[#0cce6b]"; // Lighthouse Green
    strokeClass = "stroke-[#0cce6b]";
  } else if (isNeedsImprovement) {
    colorClass = "text-[#ffa400]"; // Lighthouse Orange
    strokeClass = "stroke-[#ffa400]";
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[84px] h-[84px] flex items-center justify-center rounded-full bg-[#1b2c68a0]">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="42"
            cy="42"
            r={radius}
            strokeWidth="6"
            fill="transparent"
            className="stroke-[#0d1224]"
          />
          <circle
            cx="42"
            cy="42"
            r={radius}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${strokeClass} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <span className={`text-2xl font-mono font-bold ${colorClass}`}>
          {currentScore}
        </span>
      </div>
      <span className="text-[11px] font-medium text-gray-300 text-center w-20 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default function LighthouseMetrics() {
  return (
    <div className="mb-8 w-full p-6 bg-[#0d1224] border border-[#1b2c68a0] rounded-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-wide text-white">
          Lighthouse Scan Score
        </h2>
        {/* Optional decorative element */}
        <div className="h-[2px] w-1/3 bg-gradient-to-r from-transparent via-pink-500 to-violet-600 rounded"></div>
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
        <LighthouseRing score={99} label="Performance" />
        <LighthouseRing score={100} label="Accessibility" />
        <LighthouseRing score={100} label="Best Practices" />
        <LighthouseRing score={100} label="SEO" />
      </div>
    </div>
  );
}
