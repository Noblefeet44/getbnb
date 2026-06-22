"use client";

import { useEffect, useRef } from "react";

const painPoints = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    tag: "Safety Risk",
    title: "Rental Scams Are Rampant",
    body:
      "Fraudulent listings. Fake landlords. Advance-fee fraud. Every year, thousands of expats lose thousands of euros to rental scams in Europe's biggest cities. Renting blind in a foreign country is a minefield — especially from a distance.",
    cta: "We've already done the vetting.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    tag: "Language Barrier",
    title: "Contracts in Italian. Paperwork in German.",
    body:
      "Lease agreements in Italian, income verification in French, bureaucratic demands at every turn. Even in English-friendly cities, local property processes have hidden complexity that trips up even experienced professionals.",
    cta: "We navigate the paperwork so you don't have to.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    tag: "Time Pressure",
    title: "You Don't Have 3 Months to Search",
    body:
      "You're relocating for a job offer, a new role, or a better life. Your employer expects you there in six weeks. You can't spend evenings scrolling Idealista, Immobiliare, or Spotahome hoping for a non-scam listing.",
    cta: "We compress your search to days, not months.",
  },
];

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pain-points" className="section" style={{ background: "var(--color-cream)" }}>
      <div className="container">
        <div className="section-header">
          <span className="text-overline">The Problem</span>
          <h2 className="text-h2">
            Renting in Europe Is Harder Than It Looks
          </h2>
          <div className="gold-line" />
          <p className="text-lead" style={{ marginTop: "1.25rem" }}>
            Three obstacles stop most expats from finding a great rental — and cost them time, money, and peace of mind.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-xl)",
          }}
        >
          {painPoints.map((point, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div
                className="card card-gold"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem",
                  cursor: "default",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-gold)",
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(27,42,74,0.2)",
                  }}
                >
                  {point.icon}
                </div>

                {/* Tag */}
                <span className="badge badge-navy" style={{ alignSelf: "flex-start" }}>
                  {point.tag}
                </span>

                {/* Title */}
                <h3 className="text-h3">{point.title}</h3>

                {/* Body */}
                <p className="text-body">{point.body}</p>

                {/* Resolution line */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--color-gold-dark)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {point.cta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
