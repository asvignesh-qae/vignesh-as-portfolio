import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Portfolio of Vignesh Ambalam Suresh - Senior Software Test Automation Engineer / SDET",
  description: `This is the portfolio of Vignesh Ambalam Suresh. Senior Test Automation Engineer / SDET with 9+ years of experience developing automation solutions for UI,
    API, and cross-browser applications. Hands-on expertise in Playwright with TypeScript, Selenium with Java,
    and Rest Assured for REST API automation. Proven experience integrating automation into CI/CD pipelines,
    performing SQL-based backend validation on RDBMS platforms, and implementing accessibility testing using
    Axe-core. Frequently leads automation design and execution across Agile, multi-team environments in Europe`,
  icons: {
    icon: "/favicon-vignesh.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
