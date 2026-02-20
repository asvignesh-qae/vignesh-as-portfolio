// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { localBlogs } from "@/utils/data/blogs-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  let devToBlogs = [];

  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { cache: 'no-store' },
    )

    if (res.ok) {
      const data = await res.json();
      devToBlogs = data.map((item) => ({ ...item, source: "devto" }));
    }
  } catch (error) {
    // Dev.to API unavailable — continue with local blogs only
  }

  return [...devToBlogs, ...localBlogs]
    .filter((blog, index, self) => index === self.findIndex(b => b.url === blog.url));
};

async function page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            <BlogCard blog={blog} index={i} key={i} />
          ))
        }
      </div>
    </div>
  );
};

export default page;