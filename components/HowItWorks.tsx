"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Tell Us What You Need",
    subtitle: "2 minutes",
    body:
      "Complete our smart Rental Matching form — your destination, move-in date, budget, household size, and must-haves. The more detail you give, the better we match.",
  },
  {
    number: "02",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "We Curate Your Matches",
    subtitle: "Within 48 hours",
    body:
      "Our pan-European team searches verified listings across 34+ countries. We check landlords, review contracts, and filter out anything that doesn't meet our quality standard.",
  },
  {
    number: "03",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "You Choose & Move",
    subtitle: "On your timeline",
    body:
      "We send you a curated shortlist directly to your inbox. You review, select, and we connect you with the vetted landlord. Simple, safe, and stress-free.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".hiw-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      className="section"
      style={{
        background: "var(--color-white)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="text-overline">The Process</span>
          <h2 className="text-h2">Simple. Fast. Stress-Free.</h2>
          <div className="gold-line" />
          <p className="text-lead" style={{ marginTop: "1.25rem" }}>
            Three steps stand between you and your perfect European rental. No endless scrolling required.
          </p>
        </div>

        <div ref={sectionRef} style={{ position: "relative" }}>
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "52px",
              left: "calc(16.66% + 28px)",
              right: "calc(16.66% + 28px)",
              height: "2px",
              background: "linear-gradient(to right, var(--color-gold-light), var(--color-gold), var(--color-gold-light))",
              zIndex: 0,
              borderRadius: "2px",
            }}
            className="connector-line"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-2xl)",
              position: "relative",
              zIndex: 1,
            }}
            className="hiw-grid"
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className="hiw-item"
                style={{
                  textAlign: "center",
                  opacity: 0,
                  transform: "translateY(28px)",
                  transition: `opacity 0.65s ease ${i * 0.18}s, transform 0.65s ease ${i * 0.18}s`,
                }}
              >
                {/* Step circle */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%)",
                    border: "3px solid var(--color-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.75rem",
                    color: "var(--color-gold)",
                    boxShadow: "0 0 0 8px var(--color-gold-pale), var(--shadow-gold)",
                    position: "relative",
                  }}
                >
                  {step.icon}

                  {/* Step number badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "var(--color-gold)",
                      color: "var(--color-white)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Subtitle */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-gold-dark)",
                    marginBottom: "0.6rem",
                    background: "var(--color-gold-pale)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--color-gold-light)",
                  }}
                >
                  {step.subtitle}
                </span>

                <h3
                  className="text-h3"
                  style={{ marginBottom: "0.85rem", lineHeight: 1.3 }}
                >
                  {step.title}
                </h3>
                <p className="text-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "var(--space-3xl)" }}>
          <p style={{ color: "var(--color-slate)", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
            Ready to start? It takes less than 2 minutes.
          </p>
          <button
            onClick={() => document.getElementById("rental-quiz")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-gold btn-lg"
          >
            Find My Perfect Rental
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hiw-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .connector-line { display: none; }
        }
      `}</style>
    </section>
  );
}
