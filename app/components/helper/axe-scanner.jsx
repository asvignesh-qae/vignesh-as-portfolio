"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaUniversalAccess, FaCheckCircle, FaExclamationTriangle,
  FaTimes, FaDownload, FaChevronDown, FaChevronUp, FaRedo, FaMinus,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const impactColor = {
  critical: "border-red-500/40 bg-red-900/10",
  serious:  "border-orange-500/40 bg-orange-900/10",
  moderate: "border-yellow-500/40 bg-yellow-900/10",
  minor:    "border-gray-500/40 bg-gray-900/10",
};

const impactTextColor = {
  critical: "text-red-300",
  serious:  "text-orange-300",
  moderate: "text-yellow-300",
  minor:    "text-gray-300",
};

const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };

const formatTimestamp = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
  " at " +
  date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

const formatDuration = (ms) => `${(ms / 1000).toFixed(1)}s`;

export default function AxeScanner() {
  const [status, setStatus] = useState("idle"); // idle | scanning | done | error
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null); // "passes" | "incomplete" | "inapplicable" | null
  const [scanMeta, setScanMeta] = useState(null); // { timestamp: Date, duration: number (ms) }
  const headingRef = useRef(null);
  const triggerRef = useRef(null);

  // Move focus to heading when modal opens so screen readers announce the dialog title immediately
  useEffect(() => {
    if (showModal && headingRef.current) {
      headingRef.current.focus();
    }
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setExpandedSection(null);
        setTimeout(() => triggerRef.current?.focus(), 0);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  // Make all background content inert when modal is open so keyboard/SR users
  // cannot navigate outside the modal. Runs after portal renders into document.body.
  useEffect(() => {
    if (!showModal) return;
    const modalEl = document.getElementById("axe-modal");
    const portalRoot = modalEl?.closest("body > *");
    const siblings = Array.from(document.body.children).filter(
      (el) => el !== portalRoot
    );
    siblings.forEach((el) => el.setAttribute("inert", ""));
    return () => siblings.forEach((el) => el.removeAttribute("inert"));
  }, [showModal]);

  // Focus trap
  useEffect(() => {
    if (!showModal) return;
    const modal = document.getElementById("axe-modal");
    const focusable = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [showModal]);

  const runScan = async () => {
    setStatus("scanning");
    setResults(null);
    setExpandedSection(null);
    setScanMeta(null);
    const startTime = Date.now();
    try {
      const axe = await import("axe-core");
      const scanResults = await axe.default.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      setResults(scanResults);
      setScanMeta({ timestamp: new Date(), duration: Date.now() - startTime });
      setStatus("done");
      setShowModal(true);
    } catch {
      setStatus("error");
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setExpandedSection(null);
    setTimeout(() => triggerRef.current?.focus(), 0);
  };

  const handleRerun = () => {
    setShowModal(false);
    runScan();
  };

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleViewDetails = () => {
    setExpandedSection((prev) => (prev ? null : "passes"));
  };

  const downloadReport = () => {
    const report = {
      scannedAt: scanMeta?.timestamp?.toISOString() ?? new Date().toISOString(),
      durationMs: scanMeta?.duration,
      url: window.location.href,
      summary: {
        violations: results.violations.length,
        passes: results.passes.length,
        incomplete: results.incomplete.length,
        inapplicable: results.inapplicable.length,
      },
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        helpUrl: v.helpUrl,
        affectedElements: v.nodes.map((n) => n.html),
      })),
      incomplete: results.incomplete.map((v) => ({
        id: v.id,
        description: v.description,
        helpUrl: v.helpUrl,
      })),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `axe-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sortedViolations = results
    ? [...results.violations].sort(
        (a, b) => (impactOrder[a.impact] ?? 4) - (impactOrder[b.impact] ?? 4)
      )
    : [];

  // Concise announcement for screen readers — always in the DOM so content
  // changes are detected by aria-live. Never placed inside the modal portal.
  const liveMessage = (() => {
    if (status === "done" && results) {
      if (sortedViolations.length === 0) {
        return `Scan complete. No accessibility violations detected. ${results.passes.length} rules passed${results.incomplete.length > 0 ? `, ${results.incomplete.length} require manual review` : ""}.`;
      }
      return `Scan complete. ${sortedViolations.length} accessibility violation${sortedViolations.length > 1 ? "s" : ""} found.`;
    }
    if (status === "error") return "Accessibility scan failed. Please try again.";
    return "";
  })();

  return (
    <>
      {/* Dedicated SR live region — always mounted so aria-live fires on content change */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      <button
        ref={triggerRef}
        onClick={runScan}
        disabled={status === "scanning"}
        className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Run an axe-core accessibility scan on this page"
      >
        {status === "scanning" ? (
          <ImSpinner8 size={16} aria-hidden="true" className="animate-spin" />
        ) : (
          <FaUniversalAccess size={16} aria-hidden="true" />
        )}
        <span>{status === "scanning" ? "Scanning…" : "Run Axe Scan"}</span>
      </button>

      {showModal && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <div
            id="axe-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scan-title"
            aria-describedby="scan-summary"
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#0d1117] rounded-xl border border-[#30363d] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <span id="scan-summary" className="sr-only">
              Accessibility scan results for this page using axe-core against WCAG 2.0 A, WCAG 2.0 AA, and WCAG 2.1 AA standards.
            </span>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#30363d] flex-shrink-0">
              <h2
                id="scan-title"
                ref={headingRef}
                tabIndex={-1}
                className="text-white font-semibold flex items-center gap-2 text-sm outline-none"
              >
                <FaUniversalAccess aria-hidden="true" className="text-green-400" />
                Axe-core Accessibility Scan
              </h2>
              <button
                onClick={handleClose}
                className="text-[#8b949e] hover:text-white transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16f2b3]"
                aria-label="Close scan results"
              >
                <FaTimes size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-5 py-5 flex-1">
              {status === "done" && results && (
                <>
                  {sortedViolations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
                      <FaCheckCircle size={52} aria-hidden="true" className="text-green-400" />
                      <p className="text-green-300 text-2xl font-bold">No accessibility violations detected 🎉</p>
                      <p className="text-[#8b949e] text-sm max-w-sm">
                        This page passed all WCAG 2.1 AA rules checked by axe-core.
                      </p>

                      {/* Scan meta */}
                      {scanMeta && (
                        <div className="flex flex-col items-center gap-0.5 text-[11px] text-[#8b949e]">
                          <span>Scanned {formatTimestamp(scanMeta.timestamp)}</span>
                          <span>Completed in {formatDuration(scanMeta.duration)}</span>
                        </div>
                      )}

                      {/* Clickable stats row — single line, no wrapping */}
                      <div className="flex flex-wrap gap-2 mt-2 text-xs items-center justify-center">
                        <button
                          onClick={() => toggleSection("passes")}
                          className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors whitespace-nowrap"
                          aria-expanded={expandedSection === "passes"}
                        >
                          ✓ {results.passes.length} rules passed
                          {expandedSection === "passes"
                            ? <FaChevronUp size={9} aria-hidden="true" />
                            : <FaChevronDown size={9} aria-hidden="true" />}
                        </button>

                        {results.incomplete.length > 0 && (
                          <>
                            <span className="text-[#30363d]" aria-hidden="true">·</span>
                            <button
                              onClick={() => toggleSection("incomplete")}
                              className="flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 transition-colors whitespace-nowrap"
                              aria-expanded={expandedSection === "incomplete"}
                              title="Automated tools cannot fully verify this rule."
                            >
                              ⚠ {results.incomplete.length} item{results.incomplete.length > 1 ? "s" : ""} require{results.incomplete.length === 1 ? "s" : ""} manual review
                              {expandedSection === "incomplete"
                                ? <FaChevronUp size={9} aria-hidden="true" />
                                : <FaChevronDown size={9} aria-hidden="true" />}
                            </button>
                          </>
                        )}

                        <span className="text-[#30363d]" aria-hidden="true">·</span>
                        <button
                          onClick={() => toggleSection("inapplicable")}
                          className="flex items-center gap-1.5 text-[#8b949e] hover:text-white transition-colors whitespace-nowrap"
                          aria-expanded={expandedSection === "inapplicable"}
                        >
                          <FaMinus size={9} aria-hidden="true" />
                          {results.inapplicable.length} rules not applicable to this page
                          {expandedSection === "inapplicable"
                            ? <FaChevronUp size={9} aria-hidden="true" />
                            : <FaChevronDown size={9} aria-hidden="true" />}
                        </button>
                      </div>

                      {/* Expanded: passed rules */}
                      {expandedSection === "passes" && (
                        <div className="w-full text-left border border-[#30363d] rounded-lg overflow-hidden mt-1">
                          <div className="max-h-48 overflow-y-auto divide-y divide-[#30363d]">
                            {results.passes.map((p) => (
                              <div key={p.id} className="px-3 py-2">
                                <a
                                  href={p.helpUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-green-400 hover:underline"
                                >
                                  {p.id} ↗
                                </a>
                                <p className="text-[10px] text-[#8b949e] mt-0.5">{p.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expanded: manual review */}
                      {expandedSection === "incomplete" && (
                        <div className="w-full text-left border border-yellow-500/30 rounded-lg overflow-hidden mt-1">
                          <div className="px-3 py-2 bg-yellow-900/10 border-b border-yellow-500/30">
                            <p className="text-[10px] text-yellow-300/80">
                              These checks require human judgment — axe-core cannot automatically verify them.
                              Click <strong>How to check ↗</strong> on each rule for guidance.
                            </p>
                          </div>
                          <div className="max-h-48 overflow-y-auto divide-y divide-[#30363d]">
                            {results.incomplete.map((p) => (
                              <div key={p.id} className="px-3 py-2">
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-xs text-yellow-300">{p.id}</span>
                                  <a
                                    href={p.helpUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] text-blue-400 hover:underline shrink-0"
                                  >
                                    How to check ↗
                                  </a>
                                </div>
                                <p className="text-[10px] text-[#8b949e] mt-0.5">{p.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expanded: inapplicable rules */}
                      {expandedSection === "inapplicable" && (
                        <div className="w-full text-left border border-[#30363d] rounded-lg overflow-hidden mt-1">
                          <div className="px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
                            <p className="text-[10px] text-[#8b949e]">
                              These rules don&apos;t apply to this page — no relevant elements were found to test against them.
                            </p>
                          </div>
                          <div className="max-h-48 overflow-y-auto divide-y divide-[#30363d]">
                            {results.inapplicable.map((p) => (
                              <div key={p.id} className="px-3 py-2">
                                <a
                                  href={p.helpUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-[#8b949e] hover:text-white hover:underline transition-colors"
                                >
                                  {p.id} ↗
                                </a>
                                <p className="text-[10px] text-[#8b949e] mt-0.5">{p.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Primary action buttons */}
                      <div className="flex flex-wrap gap-3 justify-center mt-4">
                        <button
                          onClick={handleViewDetails}
                          className="px-4 py-2 text-sm rounded-lg border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#8b949e] transition-colors"
                        >
                          {expandedSection ? "Hide Details" : "View Details"}
                        </button>
                        <button
                          onClick={handleRerun}
                          className="px-4 py-2 text-sm rounded-lg border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#8b949e] transition-colors flex items-center gap-2"
                        >
                          <FaRedo size={11} aria-hidden="true" />
                          Re-run Scan
                        </button>
                        <button
                          onClick={downloadReport}
                          className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                          aria-label="Download scan report as JSON"
                        >
                          <FaDownload size={12} aria-hidden="true" />
                          Export Report
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <FaExclamationTriangle aria-hidden="true" className="text-red-400" />
                          <p className="text-red-300 font-semibold text-sm">
                            {sortedViolations.length} violation(s) found
                          </p>
                        </div>
                        <button
                          onClick={handleRerun}
                          className="flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-white transition-colors"
                        >
                          <FaRedo size={10} aria-hidden="true" />
                          Re-run Scan
                        </button>
                      </div>
                      {sortedViolations.map((v) => (
                        <div
                          key={v.id}
                          className={`border rounded-lg p-3 ${impactColor[v.impact] ?? "border-gray-500/40 bg-gray-900/10"}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium text-sm ${impactTextColor[v.impact] ?? "text-gray-300"}`}>
                              {v.id}
                            </p>
                            <a
                              href={v.helpUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-400 hover:underline shrink-0"
                            >
                              Learn more ↗
                            </a>
                          </div>
                          <p className="text-[#8b949e] text-xs mt-1">{v.description}</p>
                          <p className={`text-xs mt-1.5 ${impactTextColor[v.impact] ?? "text-gray-400"} opacity-70`}>
                            Impact: <span className="capitalize">{v.impact}</span> · {v.nodes.length} element(s)
                          </p>
                          <details className="mt-2">
                            <summary className="text-xs text-[#8b949e] cursor-pointer hover:text-white transition-colors">
                              View affected elements ({v.nodes.length})
                            </summary>
                            <div className="flex flex-col gap-1 mt-1">
                              {v.nodes.map((node, i) => (
                                <code
                                  key={i}
                                  className="block text-[10px] text-orange-300 bg-black/30 rounded px-2 py-1 truncate"
                                >
                                  {node.html}
                                </code>
                              ))}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm text-center py-8" role="alert">
                  Scan failed. Please try again.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#30363d] text-xs text-[#8b949e] flex-shrink-0 flex flex-wrap items-center justify-between gap-2">
              <span>Scanning against: WCAG 2.0 A · WCAG 2.0 AA · WCAG 2.1 AA</span>
              {status === "done" && results && sortedViolations.length > 0 && (
                <button
                  onClick={downloadReport}
                  className="flex items-center gap-1.5 text-[#8b949e] hover:text-white transition-colors"
                  aria-label="Download scan report as JSON"
                >
                  <FaDownload size={10} aria-hidden="true" />
                  <span>Export Report</span>
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
