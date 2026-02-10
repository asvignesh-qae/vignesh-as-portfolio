import { personalData } from "@/utils/data/personal-data";
import { localBlogs } from "@/utils/data/blogs-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  let devToBlogs = [];

  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { cache: 'no-store' },
    );

    if (res.ok) {
      const data = await res.json();
      devToBlogs = data.map((item) => ({ ...item, source: "devto" }));
    }
  } catch (error) {
    // Dev.to API unavailable — continue with local blogs only
  }

  const allBlogs = [...devToBlogs, ...localBlogs]
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
      <ContactSection />
    </div>
  );
}
