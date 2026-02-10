"use client";
import { useState } from "react";
import { certifications } from "@/utils/data/certifications";
import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import GlowCard from "../../helper/glow-card";

function Certifications() {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div
      id="certifications"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certifications
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <Image
                src="/certificate.svg"
                alt="Certification"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {certifications.map((certification) => (
                <GlowCard
                  key={certification.id}
                  identifier={`certification-${certification.id}`}
                >
                  <div
                    className="p-3 relative text-white cursor-pointer"
                    onClick={() => {
                      if (certification.image) {
                        setPreviewImage(certification);
                      } else if (certification.link) {
                        window.open(certification.link, "_self");
                      }
                    }}
                  >
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {certification.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      {certification.image ? (
                        <div className="transition-all duration-300 hover:scale-125">
                          <Image
                            src={certification.image}
                            alt={certification.title}
                            width={36}
                            height={36}
                            className="rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                          <BsPatchCheckFill size={36} />
                        </div>
                      )}
                      <div>
                        <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                          {certification.title}
                        </p>
                        <p className="text-sm sm:text-base">
                          {certification.issuer}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -right-2 -top-2 z-10 bg-[#1a1443] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-pink-600 transition-colors duration-300"
            >
              ✕
            </button>
            <div className="overflow-auto max-h-[80vh] w-full rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={previewImage.id}
                src={previewImage.image}
                alt={previewImage.title}
                className="w-full h-auto rounded-lg select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                style={{ pointerEvents: "none" }}
              />
            </div>
            <p className="text-center text-white mt-4 text-lg">
              {previewImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certifications;
