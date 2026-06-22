"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "James Mitchell",
    role: "Strategy Director, Accenture",
    from: "🇬🇧 London",
    to: "🇪🇸 Barcelona",
    type: "Long-term relocation",
    quote:
      "I had six weeks to relocate from London to Barcelona for a new role. GetBnB sent me five curated options within 36 hours. I signed my lease — for a stunning penthouse in Eixample — without ever visiting. Moved in on day one of my new job. Absolutely seamless.",
    rating: 5,
    avatar: "JM",
    color: "#1B2A4A",
  },
  {
    name: "Sophie van der Berg",
    role: "Regional Finance Manager, KPMG",
    from: "🇩🇪 Frankfurt",
    to: "🇳🇱 Amsterdam",
    type: "Corporate relocation",
    quote:
      "I'd heard nightmare stories about the Amsterdam rental market — fake listings, queues of 200 applicants per apartment, cash-only scams. GetBnB bypassed all of that entirely. They had a verified, English-friendly landlord lined up for us in under two days. Worth every cent.",
    rating: 5,
    avatar: "SV",
    color: "#2E4272",
  },
  {
    name: "Marco & Elena Ferretti",
    role: "Relocating family of 4",
    from: "🇺🇸 Chicago",
    to: "🇮🇹 Milan",
    type: "International family move",
    quote:
      "Moving from Chicago to Milan with two children under 10 was daunting. We needed a home near an international school, with parking, within a strict budget. GetBnB not only found exactly that — they explained the Italian lease agreement in plain English and flagged two clauses we would have missed. Extraordinary service.",
    rating: 5,
    avatar: "MF",
    color: "#243659",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      className="section"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="container">
        <div className="section-header">
          <span className="text-overline">Client Stories</span>
          <h2 className="text-h2">Real Moves. Real Results.</h2>
          <div className="gold-line" />
          <p className="text-lead" style={{ marginTop: "1.25rem" }}>
            From London executives to Chicago families — here&apos;s what our clients say.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-3xl)",
            alignItems: "center",
          }}
          className="testimonials-grid"
        >
          {/* Left: large featured card */}
          <div
            key={active}
            style={{
              background: "var(--color-white)",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-xl)",
              animation: "fadeIn 0.45s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative navy top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(to right, var(--color-gold), var(--color-gold-dark))",
              }}
            />

            {/* Quote mark */}
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "6rem",
                lineHeight: 0.8,
                color: "var(--color-gold-light)",
                marginBottom: "1rem",
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                color: "var(--color-navy)",
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: "2rem",
              }}
            >
              {current.quote}
            </blockquote>

            {/* Stars */}
            <div className="stars" style={{ marginBottom: "1rem" }}>
              {Array(current.rating).fill("★").join(" ")}
            </div>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: current.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-gold)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  flexShrink: 0,
                  border: "2px solid var(--color-gold-light)",
                }}
              >
                {current.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--color-navy)", fontSize: "0.95rem" }}>
                  {current.name}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-slate)" }}>
                  {current.role}
                </div>
              </div>

              {/* Journey badge */}
              <div
                style={{
                  marginLeft: "auto",
                  textAlign: "right",
                  fontSize: "0.8rem",
                  color: "var(--color-slate)",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>
                  {current.from} → {current.to}
                </div>
                <div style={{ color: "var(--color-gold-dark)", fontWeight: 500 }}>
                  {current.type}
                </div>
              </div>
            </div>
          </div>

          {/* Right: selector cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  background: i === active ? "var(--color-white)" : "transparent",
                  border: i === active ? "1.5px solid var(--color-gold)" : "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.1rem 1.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textAlign: "left",
                  boxShadow: i === active ? "var(--shadow-gold)" : "none",
                }}
                aria-pressed={i === active}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: i === active ? t.color : "var(--color-cream-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: i === active ? "var(--color-gold)" : "var(--color-slate)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    flexShrink: 0,
                    transition: "all 0.25s ease",
                  }}
                >
                  {t.avatar}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-slate)" }}>
                    {t.from} → {t.to}
                  </div>
                </div>
                <div style={{ fontSize: "0.75rem", color: i === active ? "var(--color-gold-dark)" : "var(--color-slate-light)", fontWeight: 600 }}>
                  {Array(t.rating).fill("★").join("")}
                </div>
              </button>
            ))}

            {/* Trust note */}
            <div
              style={{
                marginTop: "0.5rem",
                padding: "1rem 1.25rem",
                background: "var(--color-navy-pale)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p style={{ fontSize: "0.82rem", color: "var(--color-navy-light)", lineHeight: 1.5 }}>
                <strong>All testimonials are from verified clients.</strong> We never publish anonymous or unverified reviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
