// @flow strict
import Link from "next/link";
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";
import { FaUniversalAccess, FaCheckCircle } from "react-icons/fa";
import AxeScanner from "./helper/axe-scanner";

function Footer() {
  return (
    <footer className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between">
          <p className="text-sm">
            © Developer Portfolio by{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/vignesh-a-s"
              className="text-[#16f2b3] underline"
            >
              Vignesh Ambalam Suresh
            </Link>
          </p>
          <div className="flex flex-col items-center gap-3">
            <div
              role="img"
              aria-label="WCAG 2.1 AA Compliant — verified by axe-core"
              className="flex items-center gap-3 px-5 py-3 rounded-lg text-xs font-semibold bg-green-900/20 border-l-4 border-l-green-400 border border-green-500/30 text-green-400 shadow-[0_0_16px_0_rgba(74,222,128,0.12)] min-w-[220px]"
            >
              <FaUniversalAccess size={20} aria-hidden="true" className="text-green-400 shrink-0" />
              <span className="flex flex-col leading-tight">
                <span className="text-green-300 font-bold tracking-wide text-sm">WCAG 2.1 AA Compliant</span>
                <span className="text-green-500/80 text-[10px] tracking-wider uppercase">Verified by axe-core</span>
              </span>
              <FaCheckCircle size={16} aria-hidden="true" className="text-green-400 shrink-0 ml-auto" />
            </div>
            <AxeScanner />
          </div>
          <div className="flex items-center gap-5">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/asvignesh-qae"
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3]"
              aria-label="Star this repository on GitHub"
            >
              <IoStar aria-hidden="true" />
              <span>Star</span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/asvignesh-qae/developer-portfolio/fork"
              className="flex items-center gap-2 uppercase hover:text-[#16f2b3]"
              aria-label="Fork this repository on GitHub"
            >
              <CgGitFork aria-hidden="true" />
              <span>Fork</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
