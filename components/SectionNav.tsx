"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "section-1", label: "Personal Info", number: "01" },
  { id: "section-2", label: "Residency History", number: "02" },
  { id: "section-3", label: "Employment", number: "03" },
];


export default function SectionNav() {
  const [activeId, setActiveId] = useState("section-1");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 96; // navbar height
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="section-nav-desktop"
        style={{
          position: "sticky",
          top: "96px",
          width: "220px",
          flexShrink: 0,
          alignSelf: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-slate-light)",
            marginBottom: "1rem",
          }}
        >
          Jump to section
        </p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {sections.map(({ id, label, number }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.7rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: isActive
                    ? "1.5px solid var(--color-gold-light)"
                    : "1.5px solid transparent",
                  background: isActive ? "var(--color-gold-pale)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: isActive ? "var(--color-navy)" : "var(--color-cream-dark)",
                    color: isActive ? "var(--color-gold)" : "var(--color-slate-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  {number}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--color-navy)" : "var(--color-slate)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <span style={{ marginLeft: "auto", color: "var(--color-gold)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Progress indicator */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <p style={{ fontSize: "0.72rem", color: "var(--color-slate-light)", fontWeight: 600, marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Progress
          </p>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${((sections.findIndex((s) => s.id === activeId) + 1) / sections.length) * 100}%`,
              }}
            />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--color-slate)", marginTop: "0.5rem", fontWeight: 500 }}>
            Section {sections.findIndex((s) => s.id === activeId) + 1} of {sections.length}
          </p>
        </div>
      </aside>

      {/* Mobile pill nav */}
      <nav
        className="section-nav-mobile"
        style={{
          position: "sticky",
          top: "72px",
          zIndex: 50,
          background: "rgba(250,248,245,0.97)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0.6rem var(--space-md)",
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {sections.map(({ id, label, number }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "var(--radius-full)",
                border: `1.5px solid ${isActive ? "var(--color-gold)" : "var(--color-border)"}`,
                background: isActive ? "var(--color-navy)" : "var(--color-white)",
                color: isActive ? "var(--color-gold)" : "var(--color-slate)",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              <span>{number}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (min-width: 1024px) {
          .section-nav-mobile { display: none !important; }
        }
        @media (max-width: 1023px) {
          .section-nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
