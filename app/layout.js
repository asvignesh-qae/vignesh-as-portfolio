import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import { version } from "react";
const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vignesh-as.dev";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vignesh Ambalam Suresh | Senior SDET & Test Automation Engineer",
    template: "%s | Vignesh Ambalam Suresh",
  },
  description:
    "Senior SDET with 9+ years building Playwright, Selenium & REST API automation frameworks. Based in Budapest, available across EEA. View my portfolio.",
  keywords: [
    "SDET",
    "Test Automation Engineer",
    "QA Engineer",
    "Playwright",
    "Selenium",
    "TypeScript",
    "Java",
    "REST API Testing",
    "CI/CD",
    "Accessibility Testing",
    "axe-core",
    "WCAG",
    "GitHub Actions",
    "Budapest",
    "EEA",
  ],
  authors: [{ name: "Vignesh Ambalam Suresh", url: siteUrl }],
  creator: "Vignesh Ambalam Suresh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Vignesh Ambalam Suresh | Senior SDET & Test Automation Engineer",
    description:
      "Senior SDET with 9+ years building Playwright, Selenium & REST API automation frameworks. Based in Budapest, available across EEA.",
    siteName: "Vignesh Ambalam Suresh Portfolio",
    images: [
      {
        url: "/card.png",
        width: 1200,
        height: 630,
        alt: "Vignesh Ambalam Suresh - Senior SDET & Test Automation Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vignesh Ambalam Suresh | Senior SDET & Test Automation Engineer",
    description:
      "Senior SDET with 9+ years building Playwright, Selenium & REST API automation frameworks. Based in Budapest, available across EEA.",
    images: ["/card.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon-vignesh.ico",
  },
  verification:{
    google: "4efMyL7VizkRdZ6BEQf3DGnHg7gi7MXORkUggoIbEA",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vignesh Ambalam Suresh",
  jobTitle: "Senior Software Test Automation Engineer / SDET",
  description:
    "Senior SDET with 9+ years of experience in Playwright, Selenium, REST API automation, CI/CD, and accessibility testing.",
  url: siteUrl,
  email: "asvignesh.qae@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Budapest",
    addressCountry: "HU",
  },
  sameAs: [
    "https://www.linkedin.com/in/vignesh-a-s",
    "https://github.com/asvignesh-qae",
    "https://stackoverflow.com/users/14340495/vignesh-a-s",
  ],
  knowsAbout: [
    "Test Automation",
    "Playwright",
    "Selenium",
    "TypeScript",
    "Java",
    "REST API Testing",
    "CI/CD",
    "Accessibility Testing",
    "WCAG",
    "GitHub Actions",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <Analytics />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
