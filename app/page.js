import { personalData } from "@/utils/data/personal-data";
import { localBlogs } from "@/utils/data/blogs-data";
import dynamic from "next/dynamic";
import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";

// Below-fold sections: SSR'd for SEO but JS chunks loaded lazily on client
const Experience = dynamic(() => import("./components/homepage/experience"));
const Skills = dynamic(() => import("./components/homepage/skills"));
const Projects = dynamic(() => import("./components/homepage/projects"));
const Blog = dynamic(() => import("./components/homepage/blog"));
const Education = dynamic(() => import("./components/homepage/education"));
const Certifications = dynamic(() => import("./components/homepage/certifications"));
const ContactSection = dynamic(() => import("./components/homepage/contact"));

async function getData() {
  let devToBlogs = [];

  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } },
    );

    if (res.ok) {
      const data = await res.json();
      devToBlogs = data.map((item) => ({ ...item, source: "devto" }));
    }
  } catch (error) {
    // Dev.to API unavailable — continue with local blogs only
  }

  const allBlogs = [...devToBlogs, ...localBlogs]
    .filter((blog, index, self) => index === self.findIndex(b => b.url === blog.url))
    .sort(() => Math.random() - 0.5);

  return allBlogs;
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Blog blogs={blogs} />
      <Education />
      <Certifications />
      <ContactSection />
    </div>
  );
}
