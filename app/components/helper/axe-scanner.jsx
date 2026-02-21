"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaUniversalAccess, FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

export default function AxeScanner() {
  const [status, setStatus] = useState("idle"); // idle | scanning | done | error
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (showModal && closeRef.current) {
      closeRef.current.focus();
    }
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setTimeout(() => triggerRef.current?.focus(), 0);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  const runScan = async () => {
    setStatus("scanning");
    setResults(null);
    try {
      const axe = await import("axe-core");
      const scanResults = await axe.default.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      setResults(scanResults);
      setStatus("done");
    } catch {
      setStatus("error");
    } finally {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={runScan}
        disabled={status === "scanning"}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold border border-violet-500/50 bg-violet-900/20 text-violet-300 hover:bg-violet-900/40 hover:border-violet-400 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Run an axe-core accessibility scan on this page"
      >
        {status === "scanning" ? (
          <ImSpinner8 size={10} aria-hidden="true" className="animate-spin" />
        ) : (
          <FaUniversalAccess size={10} aria-hidden="true" />
        )}
        <span>{status === "scanning" ? "Scanning…" : "Run Axe Scan"}</span>
      </button>

      {showModal && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="axe-modal-title"
            className="relative w-full max-w-2xl max-h-[80vh] bg-[#0d1117] rounded-xl border border-[#30363d] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#30363d] flex-shrink-0">
              <h2 id="axe-modal-title" className="text-white font-semibold flex items-center gap-2 text-sm">
                <FaUniversalAccess aria-hidden="true" className="text-green-400" />
                Axe-core Accessibility Scan
              </h2>
              <button
                ref={closeRef}
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
                  {results.violations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                      <FaCheckCircle size={52} aria-hidden="true" className="text-green-400" />
                      <p className="text-green-300 text-2xl font-bold">0 Violations Found</p>
                      <p className="text-[#8b949e] text-sm max-w-sm">
                        This page passed all WCAG 2.1 AA rules checked by axe-core.
                      </p>
                      <div className="flex gap-6 mt-3 text-sm flex-wrap justify-center">
                        <span className="text-green-400">✓ {results.passes.length} rules passed</span>
                        {results.incomplete.length > 0 && (
                          <span className="text-yellow-400">⚠ {results.incomplete.length} need manual review</span>
                        )}
                        <span className="text-[#8b949e]">{results.inapplicable.length} not applicable</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FaExclamationTriangle aria-hidden="true" className="text-red-400" />
                        <p className="text-red-300 font-semibold text-sm">
                          {results.violations.length} violation(s) found
                        </p>
                      </div>
                      {results.violations.map((v, i) => (
                        <div key={i} className="border border-red-500/30 rounded-lg p-3 bg-red-900/10">
                          <p className="text-red-300 font-medium text-sm">{v.id}</p>
                          <p className="text-[#8b949e] text-xs mt-1">{v.description}</p>
                          <p className="text-xs mt-1.5 text-red-400/70">
                            Impact: <span className="capitalize">{v.impact}</span> · {v.nodes.length} element(s)
                          </p>
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
            <div className="px-5 py-3 border-t border-[#30363d] text-[10px] text-[#8b949e] flex-shrink-0">
              Scanning against: WCAG 2.0 A · WCAG 2.0 AA · WCAG 2.1 AA
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
