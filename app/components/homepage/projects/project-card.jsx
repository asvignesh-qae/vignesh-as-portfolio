"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function toRawGitHubUrl(url) {
  // Convert https://github.com/user/repo/blob/branch/path
  // to https://raw.githubusercontent.com/user/repo/branch/path
  const match = url.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/
  );
  if (match) {
    return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${match[3]}`;
  }
  return null;
}

function ProjectCard({ project }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (previewUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!previewUrl) {
      setMarkdown(null);
      setError(null);
      return;
    }

    const rawUrl = toRawGitHubUrl(previewUrl);
    if (!rawUrl) {
      setError("Could not load preview for this URL.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load README content.");
        setLoading(false);
      });
  }, [previewUrl]);

  const handleLinkClick = (e, url) => {
    e.preventDefault();
    setPreviewUrl(url);
  };

  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="flex items-center gap-3 px-4 lg:px-8 py-3 lg:py-5">
        <div className="flex flex-row space-x-1 lg:space-x-2 flex-shrink-0">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
        </div>
        <p className="text-center flex-1 text-[#16f2b3] text-base lg:text-xl">
          {project.name}
        </p>
      </div>

      {previewUrl && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-5"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] bg-[#0d1117] rounded-xl border border-[#30363d] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute -top-3 -right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-all duration-200 shadow-lg"
              title="Close preview"
            >
              <FaTimes size={16} />
            </button>

            {/* Header bar */}
            <div className="flex items-center gap-2 px-4 lg:px-6 py-3 bg-[#161b22] border-b border-[#30363d] rounded-t-xl flex-shrink-0">
              <svg className="w-4 h-4 text-[#8b949e] flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/>
              </svg>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#58a6ff] hover:underline truncate"
              >
                README.md
              </a>
              <span className="text-xs text-[#8b949e] hidden sm:inline">
                — {previewUrl.split('/').slice(3, 5).join('/')}
              </span>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 lg:px-10 py-6 flex-1">
              {loading && (
                <div className="flex items-center gap-3 py-12 justify-center">
                  <div className="w-5 h-5 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#8b949e] text-sm">Loading preview...</p>
                </div>
              )}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              {markdown && (
                <div className="github-markdown">
                  <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
          <code className="font-mono text-xs md:text-sm lg:text-base">
            <div className="blink">
              <span className="mr-2 text-pink-500">const</span>
              <span className="mr-2 text-white">project</span>
              <span className="mr-2 text-pink-500">=</span>
              <span className="text-gray-400">{'{'}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
              <span className="text-gray-400">{`'`}</span>
              <span className="text-amber-300">{project.name}</span>
              <span className="text-gray-400">{`',`}</span>
            </div>

            <div className="ml-4 lg:ml-8 mr-2">
              <span className=" text-white">tools:</span>
              <span className="text-gray-400">{` ['`}</span>
              {
                project.tools.map((tag, i) => (
                  <React.Fragment key={i}>
                    <span className="text-amber-300">{tag}</span>
                    {
                      project.tools?.length - 1 !== i &&
                      <span className="text-gray-400">{`', '`}</span>
                    }
                  </React.Fragment>
                ))
              }
              <span className="text-gray-400">{`'],`}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
              <span className="text-orange-400">{project.role}</span>
              <span className="text-gray-400">,</span>
            </div>
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-white">Description:</span>
              <span className="text-cyan-400">{' ' + project.description}</span>
              <span className="text-gray-400">,</span>
            </div>
            {project.impact && (
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">Impact:</span>
                <span className="text-green-400">{' ' + project.impact}</span>
                <span className="text-gray-400">,</span>
              </div>
            )}
            {project.code && (
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">code:</span>
                <span className="text-gray-400">{` '`}</span>
                <a
                  href={project.code}
                  onClick={(e) => handleLinkClick(e, project.code)}
                  className="text-amber-300 underline hover:text-[#16f2b3] cursor-pointer"
                >
                  {project.code}
                </a>
                <span className="text-gray-400">{`',`}</span>
              </div>
            )}
            {project.demo && (
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">demo:</span>
                <span className="text-gray-400">{` '`}</span>
                <a
                  href={project.demo}
                  onClick={(e) => handleLinkClick(e, project.demo)}
                  className="text-amber-300 underline hover:text-[#16f2b3] cursor-pointer"
                >
                  {project.demo}
                </a>
                <span className="text-gray-400">{`',`}</span>
              </div>
            )}
            {project.liveReports?.length > 0 && (
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">liveReports:</span>
                <span className="text-gray-400">{` [`}</span>
                {project.liveReports.map((report, i) => (
                  <div key={i} className="ml-4">
                    <span className="text-gray-400">{`{ `}</span>
                    <span className="text-white">label:</span>
                    <span className="text-amber-300">{` '${report.label}'`}</span>
                    <span className="text-gray-400">{`, `}</span>
                    <span className="text-white">url:</span>
                    <span className="text-gray-400">{` '`}</span>
                    <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-[#16f2b3] underline hover:text-amber-300">
                      {report.url}
                    </a>
                    <span className="text-gray-400">{`' }`}{i < project.liveReports.length - 1 ? ',' : ''}</span>
                  </div>
                ))}
                <span className="text-gray-400">{`],`}</span>
              </div>
            )}
            <div><span className="text-gray-400">{`};`}</span></div>
          </code>

          {project.liveReports?.length > 0 && (
            <div className="mt-5 pt-4 border-t border-indigo-900/50 flex flex-wrap gap-3">
              {project.liveReports.map((report, i) => (
                <a
                  key={i}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#16f2b3]/10 border border-[#16f2b3]/30 text-[#16f2b3] text-sm font-medium hover:bg-[#16f2b3]/20 hover:border-[#16f2b3]/60 transition-all duration-200 group"
                >
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16f2b3] opacity-75"></span>
                    <BsCircleFill className="relative inline-flex text-[#16f2b3]" size={10} />
                  </span>
                  <FaChartBar size={13} />
                  <span>{report.label}</span>
                  <svg className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default ProjectCard;
