'use client';
import { projectsData } from '@/utils/data/projects-data';
import { useState, useMemo } from 'react';
import ProjectCard from './project-card';

const allTools = [...new Set(projectsData.flatMap((p) => p.tools))];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    return projectsData.filter((p) =>
      p.tools.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <h2 className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </h2>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-24">
        {/* Filter pills */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter projects by technology"
        >
          {['All', ...allTools].map((tool) => (
            <button
              key={tool}
              onClick={() => setActiveFilter(tool)}
              aria-pressed={activeFilter === tool}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeFilter === tool
                  ? 'bg-[#16f2b3] text-[#0d1224] border-[#16f2b3]'
                  : 'text-[#a0a8c0] border-[#353a52] hover:border-[#16f2b3] hover:text-[#16f2b3]'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-[#a0a8c0] text-sm py-6">No projects match this filter.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((project, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={project.id}
                className="sticky-card w-full mx-auto max-w-2xl sticky"
              >
                <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
