"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1"; // bump this to re-ask after policy changes

export default function CookieConsent() {
  // null = hydrating, "pending" = banner visible, "accepted" | "declined" = decided
  const [status, setStatus] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      const version = localStorage.getItem(`${CONSENT_KEY}_version`);
      if (stored && version === CONSENT_VERSION) {
        setStatus(stored);
      } else {
        setStatus("pending");
      }
    } catch {
      setStatus("pending");
    }
  }, []);

  const saveConsent = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      localStorage.setItem(`${CONSENT_KEY}_version`, CONSENT_VERSION);
    } catch {
      // localStorage blocked (e.g. private mode) — still update UI
    }
    setStatus(value);
  };

  const gtmId = process.env.NEXT_PUBLIC_GTM;

  return (
    <>
      {/* Inject GTM only after explicit consent */}
      {status === "accepted" && gtmId && (
        <Script
          id="gtm-consent-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}

      {/* Cookie banner — only shown while status is "pending" */}
      {status === "pending" && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-describedby="cookie-consent-description"
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        >
          <div className="max-w-3xl mx-auto bg-[#0d1224] border border-[#353a52] rounded-xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm mb-1">
                This site uses cookies
              </p>
              <p
                id="cookie-consent-description"
                className="text-[#a0a8c0] text-xs leading-relaxed"
              >
                We use optional cookies (Google Tag Manager) to understand how
                visitors use this site. Analytics data is never sold. See our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#16f2b3] underline hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                for full details.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => saveConsent("declined")}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-[#353a52] text-[#a0a8c0] hover:border-white hover:text-white transition-colors"
                aria-label="Decline optional cookies"
              >
                Decline
              </button>
              <button
                onClick={() => saveConsent("accepted")}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:opacity-90 transition-opacity"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
