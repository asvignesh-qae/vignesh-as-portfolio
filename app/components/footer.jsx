// @flow strict
import Link from "next/link";
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";
import { FaUniversalAccess } from "react-icons/fa";

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
          <div
            aria-label="This portfolio has been audited for accessibility using axe-core"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 border border-green-500/40 text-green-400"
          >
            <FaUniversalAccess size={13} aria-hidden="true" />
            <span>Accessibility Audited · axe-core</span>
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
