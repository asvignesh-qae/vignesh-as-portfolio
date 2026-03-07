"use client";
// @flow strict

import { track } from "@vercel/analytics";
import { useState, useEffect, useRef } from "react";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
// Inline SVGs — avoids loading react-icons/bs, md, ri, si chunks on initial render
function GithubIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
function LinkedinIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
    </svg>
  );
}
function WhatsappIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  );
}
function LeetcodeIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}
function CodewarsIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1.072.142A1.072 1.072 0 0 0 0 1.214v21.572a1.072 1.072 0 0 0 1.072 1.072h21.856A1.072 1.072 0 0 0 24 22.786V1.214A1.072 1.072 0 0 0 22.928.142zm9.736 1.818a.904.904 0 0 1 .828.539.784.784 0 0 1 1.274.493.639.639 0 0 1 .29-.06c.33.008.59.262.625.575a1.322 1.322 0 0 1 .624-.515 1.325 1.325 0 0 1 1.718.71 1.098 1.098 0 0 1 .306-.236 1.102 1.102 0 0 1 1.483.479 1.094 1.094 0 0 1 .12.47.994.994 0 0 1 1.322 1.214.904.904 0 0 1 .874 1.438.784.784 0 0 1 .176 1.356.639.639 0 0 1 .19.224.642.642 0 0 1-.011.613 1.326 1.326 0 0 1 .482.235 1.334 1.334 0 0 1 .258 1.842 1.098 1.098 0 0 1 .35.15 1.102 1.102 0 0 1 .337 1.516 1.094 1.094 0 0 1-.344.344.994.994 0 0 1 .228 1.318 1.006 1.006 0 0 1-.605.434.904.904 0 0 1-.803 1.482.814.814 0 0 0-.008-.04.784.784 0 0 1-1.075.873.639.639 0 0 1-.098.28.625.625 0 0 1-.43.288 1.33 1.33 0 0 1 .023.456 1.334 1.334 0 0 1-1.44 1.173 1.098 1.098 0 0 1 .054.377 1.102 1.102 0 0 1-1.128 1.072 1.098 1.098 0 0 1-.47-.12.994.994 0 0 1-1.696.583.904.904 0 0 1-1.685.075.784.784 0 0 1-1.274-.493.639.639 0 0 1-.29.064.64.64 0 0 1-.621-.58l.004-.007a1.326 1.326 0 0 1-.632.523 1.334 1.334 0 0 1-1.718-.706 1.098 1.098 0 0 1-.306.232 1.102 1.102 0 0 1-1.48-.478 1.094 1.094 0 0 1-.123-.471.994.994 0 0 1-1.318-1.21.904.904 0 0 1-.874-1.442.784.784 0 0 1-.176-1.356.639.639 0 0 1-.194-.224.642.642 0 0 1 .011-.61l.019.004a1.326 1.326 0 0 1-.497-.239 1.334 1.334 0 0 1-.262-1.845 1.098 1.098 0 0 1-.35-.146 1.102 1.102 0 0 1-.337-1.52 1.094 1.094 0 0 1 .347-.34A.994.994 0 0 1 2.88 9a.904.904 0 0 1 .803-1.48.784.784 0 0 1 1.083-.836.639.639 0 0 1 .098-.28.649.649 0 0 1 .433-.288 1.33 1.33 0 0 1-.026-.452A1.334 1.334 0 0 1 6.716 4.49a1.098 1.098 0 0 1-.06-.377 1.101 1.101 0 0 1 1.13-1.073 1.094 1.094 0 0 1 .47.115.994.994 0 0 1 1.696-.579.904.904 0 0 1 .857-.617zM3.683 7.519a.784.784 0 0 0 .008.041l-.004-.04a.904.904 0 0 0-.004-.001zM17.502 19.61a1.098 1.098 0 0 0-.002-.004h-.037a1.334 1.334 0 0 0 .039.004zM13.825 3.507a1.322 1.322 0 0 0-.008.012l.008-.011zm-2.369-.014l-.003.003a.9.9 0 0 1-.665.27.896.896 0 0 1-.583-.232.994.994 0 0 1-.986.732.99.99 0 0 1-.362-.075 1.098 1.098 0 0 1-1.061 1.046 1.326 1.326 0 0 1 .123.736 1.334 1.334 0 0 1-.725 1.035 1.1 1.1 0 0 1 .307.795 1.106 1.106 0 0 1-.232.65c.321.18.53.523.523.915a1.016 1.016 0 0 1-.07.337.915.915 0 0 1 .82.937.923.923 0 0 1-.01.138.74.74 0 0 1 .157-.01c.343.007.627.25.702.57a.661.661 0 0 1 .38-.111c.31.007.561.224.632.511a.418.418 0 0 1 .381-.015 1.352 1.352 0 0 1 .303-.63.418.418 0 0 1-.12-.143.422.422 0 0 1 .004-.392.665.665 0 0 1-.325-1.117.736.736 0 0 1-.359-.336.74.74 0 0 1 .385-1.023.747.747 0 0 0-.06.026.915.915 0 0 1-.201-.262.915.915 0 0 1 .623-1.315V6.53a1.02 1.02 0 0 1 .437-1.371 1.012 1.012 0 0 1 .553-.112 1.11 1.11 0 0 1 .598-1.054 1.12 1.12 0 0 1 .06-.026.642.642 0 0 1-.109-.21.784.784 0 0 1-.455.132.784.784 0 0 1-.662-.396zm4.573 1.512a1.326 1.326 0 0 1-.587.46 1.334 1.334 0 0 1-1.255-.142v-.011a1.11 1.11 0 0 1-.553.66 1.106 1.106 0 0 1-.683.113 1.02 1.02 0 0 1-.553.889 1.016 1.016 0 0 1-.329.105.918.918 0 0 1-.43 1.169.923.923 0 0 1-.127.056.74.74 0 0 1 .086.13.738.738 0 0 1-.168.89.661.661 0 0 1 .28.283.655.655 0 0 1-.149.796.418.418 0 0 1 .153.164c.019.034.03.068.038.101a1.356 1.356 0 0 1 .672-.015.422.422 0 0 1 .056-.142.422.422 0 0 1 .34-.194.665.665 0 0 1 .796-.848.736.736 0 0 1 .112-.478.733.733 0 0 1 1.016-.224.915.915 0 0 1 .127-.306.915.915 0 0 1 1.27-.28.915.915 0 0 1 .179.153 1.02 1.02 0 0 1 1.408-.314 1.012 1.012 0 0 1 .374.422c.355-.24.833-.261 1.214-.015a1.11 1.11 0 0 1 .209.172.642.642 0 0 1 .082-.108.784.784 0 0 1-.332-.337.784.784 0 0 1 .03-.77.9.9 0 0 1-.553-.455.896.896 0 0 1-.075-.624.994.994 0 0 1-1.117-.511.994.994 0 0 1-.104-.359 1.098 1.098 0 0 1-1.427-.43zM5.249 7.37a.784.784 0 0 1-.124.46.784.784 0 0 1-.68.362c.06.235.026.49-.112.71a.896.896 0 0 1-.5.377c.31.325.373.829.12 1.225a.99.99 0 0 1-.255.269 1.098 1.098 0 0 1 .351 1.45 1.326 1.326 0 0 1 .691.276 1.334 1.334 0 0 1 .512 1.154c.28-.064.579-.019.84.15a1.106 1.106 0 0 1 .438.53 1.02 1.02 0 0 1 1.05.03 1.016 1.016 0 0 1 .257.231.914.914 0 0 1 1.225-.224.919.919 0 0 1 .112.086.74.74 0 0 1 .071-.142.74.74 0 0 1 .852-.306.661.661 0 0 1 .1-.381.664.664 0 0 1 .763-.273.418.418 0 0 1 .246-.373 1.36 1.36 0 0 1-.358-.523v-.008a.418.418 0 0 1-.25.075.422.422 0 0 1-.344-.19.665.665 0 0 1-1.132-.243.736.736 0 0 1-.47.149.733.733 0 0 1-.718-.755.915.915 0 0 1-.329.049.915.915 0 0 1-.855-1.177h-.004a1.016 1.016 0 0 1-.993-1.042 1.012 1.012 0 0 1 .168-.534 1.11 1.11 0 0 1-.64-1.035 1.11 1.11 0 0 1 .068-.358.65.65 0 0 1-.1-.019zm11.127 2.133a.913.913 0 0 1-1.225.224.926.926 0 0 1-.112-.082.74.74 0 0 1-.067.142.74.74 0 0 1-.852.302.661.661 0 0 1-.105.385.662.662 0 0 1-.762.277.418.418 0 0 1-.063.212.426.426 0 0 1-.075.086 1.356 1.356 0 0 1 .314.564.418.418 0 0 1 .187-.04.422.422 0 0 1 .343.194.665.665 0 0 1 1.136.242.736.736 0 0 1 .467-.153c.41.008.728.348.72.755a.74.74 0 0 1 0 .008v-.005a.915.915 0 0 1 .326-.052.915.915 0 0 1 .896.941.919.919 0 0 1-.037.236c.564.015 1.008.482.993 1.046a1.012 1.012 0 0 1-.168.534 1.11 1.11 0 0 1 .647 1.035 1.11 1.11 0 0 1-.075.362l.004-.007.1.018a.784.784 0 0 1 .124-.46.784.784 0 0 1 .68-.362.9.9 0 0 1 .112-.71.896.896 0 0 1 .504-.373.994.994 0 0 1-.123-1.225.99.99 0 0 1 .257-.269 1.098 1.098 0 0 1-.35-1.453 1.326 1.326 0 0 1-.696-.273h-.003a1.334 1.334 0 0 1-.512-1.158 1.082 1.082 0 0 1-.837-.145 1.106 1.106 0 0 1-.44-.535 1.02 1.02 0 0 1-1.05-.026 1.016 1.016 0 0 1-.258-.235zm-.094 3.116l-.007.066a.74.74 0 0 0 .007-.066zm-2.864-.259a1.36 1.36 0 0 1-.363.598.418.418 0 0 1 .194.187.422.422 0 0 1-.007.396.665.665 0 0 1 .329 1.113.736.736 0 0 1 .358.336.739.739 0 0 1-.32.994.915.915 0 0 1 .197.261.91.91 0 0 1-.396 1.233.919.919 0 0 1-.224.082v.004a1.02 1.02 0 0 1-.44 1.374 1.012 1.012 0 0 1-.55.109 1.11 1.11 0 0 1-.661 1.083.642.642 0 0 1 .112.21.026.026 0 0 1-.004 0v.003a.784.784 0 0 1 .456-.134.784.784 0 0 1 .661.392.9.9 0 0 1 .665-.27.896.896 0 0 1 .587.236.994.994 0 0 1 .982-.736.99.99 0 0 1 .362.079v.022a1.1 1.1 0 0 1 1.061-1.072 1.326 1.326 0 0 1-.123-.736c.056-.46.34-.837.725-1.035l.003.004a1.102 1.102 0 0 1-.31-.795 1.106 1.106 0 0 1 .232-.654 1.02 1.02 0 0 1-.452-1.251.915.915 0 0 1-.822-.934.923.923 0 0 1 .011-.142.74.74 0 0 1-.157.015.74.74 0 0 1-.698-.572.661.661 0 0 1-.385.112.667.667 0 0 1-.627-.512.418.418 0 0 1-.217.053.418.418 0 0 1-.18-.045zm-.964.93a1.36 1.36 0 0 1-.336.042c-.112 0-.22-.012-.322-.038a.418.418 0 0 1-.06.295.422.422 0 0 1-.343.195.665.665 0 0 1-.792.844.736.736 0 0 1-.112.478.74.74 0 0 1-1.02.224.915.915 0 0 1-.127.306.915.915 0 0 1-1.266.28.919.919 0 0 1-.183-.153v.004a1.02 1.02 0 0 1-1.408.31 1.012 1.012 0 0 1-.374-.418c-.355.239-.83.261-1.214.015a1.113 1.113 0 0 1-.21-.172.65.65 0 0 1-.081.105.784.784 0 0 1 .336.336.784.784 0 0 1-.034.77.89.89 0 0 1 .553.455.896.896 0 0 1 .075.624.994.994 0 0 1 1.12.515.99.99 0 0 1 .101.355 1.098 1.098 0 0 1 1.431.43 1.326 1.326 0 0 1 .587-.46c.43-.172.896-.104 1.255.142a1.106 1.106 0 0 1 .549-.65 1.106 1.106 0 0 1 .683-.108 1.02 1.02 0 0 1 .553-.893 1.02 1.02 0 0 1 .333-.104.916.916 0 0 1 .425-1.17.919.919 0 0 1 .131-.052.736.736 0 0 1-.09-.134.738.738 0 0 1 .169-.886.661.661 0 0 1-.28-.284.67.67 0 0 1 .149-.799.418.418 0 0 1-.15-.164.418.418 0 0 1-.048-.24z" />
    </svg>
  );
}
function DownloadIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
    </svg>
  );
}
function ContactIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM20 17H24V19H20V17ZM17 12H24V14H17V12ZM19 7H24V9H19V7Z" />
    </svg>
  );
}
import dynamic from "next/dynamic";
import LighthouseMetrics from "./lighthouse-metrics";
import AxeScanner from "@/app/components/helper/axe-scanner";
const TypeAnimation = dynamic(
  () =>
    import("react-type-animation").then((m) => ({ default: m.TypeAnimation })),
  {
    ssr: false,
    loading: () => (
      <span className="text-[#16f2b3]">
        Senior Software Test Automation Engineer
      </span>
    ),
  },
);

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
  const didOpenResumeRef = useRef(false);

  // Focus close button when modal opens; return focus to trigger when it closes.
  // Guard with didOpenResumeRef so focus is NOT stolen on initial page load.
  useEffect(() => {
    if (showResume) {
      didOpenResumeRef.current = true;
      resumeCloseRef.current?.focus();
    } else if (didOpenResumeRef.current) {
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
        priority
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-1 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is <span className=" text-pink-500">{personalData.name}</span>
            {`, I'm a `}
            <span className="block min-h-[5rem] lg:min-h-[7rem]">
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
            </span>
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
              <GithubIcon size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              aria-label="LinkedIn profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <LinkedinIcon size={30} />
            </Link>
            <Link
              href={personalData.leetcode}
              target="_blank"
              aria-label="LeetCode profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <LeetcodeIcon size={30} />
            </Link>
            <Link
              href={personalData.codeWars}
              target="_blank"
              aria-label="Codewars profile"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <CodewarsIcon size={30} />
            </Link>
            <Link
              href={personalData.whatsApp}
              target="_blank"
              aria-label="Contact on WhatsApp"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <WhatsappIcon size={30} />
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

          <div className="mb-8 flex items-center gap-3">
            <Link
              href="#contact"
              className="px-4 text-xs md:px-8 py-4 md:text-sm rounded-full text-center font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3 bg-gradient-to-r to-pink-500 from-violet-600 hover:from-pink-500 hover:to-violet-600"
            >
              <span>Contact me</span>
              <ContactIcon size={16} />
            </Link>

            <button
              ref={resumeTriggerRef}
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 md:px-8 py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              onClick={() => {
                track("resume_view");
                setShowResume(true);
              }}
              aria-haspopup="dialog"
            >
              <span>Get Resume</span>
              <DownloadIcon size={16} />
            </button>

            <AxeScanner />
          </div>

          <LighthouseMetrics />
        </div>
        <div
          className="order-2 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] overflow-hidden min-w-0"
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
                onClick={() => track("resume_download")}
              >
                <DownloadIcon size={16} />
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
