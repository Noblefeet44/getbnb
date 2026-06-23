"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headlineRef.current, subRef.current, ctaRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity 0.75s ease, transform 0.75s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200 + i * 180);
    });
  }, []);

  const scrollToQuiz = () => {
    document.getElementById("rental-quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-navy)",
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #0F1B35 0%, #1B2A4A 45%, #243659 70%, #1a3040 100%)",
          zIndex: 0,
        }}
      />

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.12)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.08)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.06)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Gold glow blob */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "60%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* City silhouette SVG */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          opacity: 0.07,
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "200px" }}
        >
          <path
            d="M0,200 L0,160 L40,160 L40,120 L60,120 L60,100 L80,100 L80,80 L100,80 L100,100 
               L120,100 L120,60 L130,60 L130,40 L140,40 L140,60 L150,60 L150,100 
               L180,100 L180,130 L200,130 L200,90 L210,90 L210,70 L220,70 L220,90 
               L240,90 L240,130 L270,130 L270,80 L285,80 L285,60 L295,60 L295,80 
               L310,80 L310,110 L340,110 L340,75 L355,75 L355,55 L365,55 L365,40 
               L375,40 L375,55 L385,55 L385,75 L400,75 L400,110 
               L430,110 L430,130 L460,130 L460,90 L475,90 L475,65 L490,65 L490,90 
               L510,90 L510,140 L550,140 L550,100 L570,100 L570,80 L590,80 L590,100 
               L610,100 L610,120 L640,120 L640,85 L655,85 L655,65 L670,65 L670,85 
               L690,85 L690,120 L720,120 L720,150 L760,150 L760,110 L780,110 L780,85 
               L800,85 L800,110 L830,110 L830,140 L860,140 L860,100 L875,100 L875,75 
               L890,75 L890,55 L905,55 L905,75 L920,75 L920,100 L950,100 L950,130 
               L980,130 L980,90 L1000,90 L1000,70 L1015,70 L1015,90 L1040,90 L1040,120 
               L1070,120 L1070,80 L1085,80 L1085,60 L1100,60 L1100,80 L1120,80 
               L1120,110 L1150,110 L1150,85 L1170,85 L1170,60 L1185,60 L1185,40 
               L1200,40 L1200,60 L1215,60 L1215,85 L1240,85 L1240,120 
               L1270,120 L1270,140 L1300,140 L1300,100 L1320,100 L1320,75 L1340,75 
               L1340,100 L1370,100 L1370,130 L1400,130 L1400,160 L1440,160 L1440,200 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingTop: "100px",
          paddingBottom: "80px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "var(--radius-full)",
            padding: "0.4rem 1.1rem",
            marginBottom: "2rem",
            opacity: 0,
            animation: "fadeIn 0.6s ease 0.1s forwards",
          }}
        >
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-gold)", animation: "pulse-gold 2s infinite", display: "block" }} />
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            European Rental Concierge
          </span>
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "var(--color-white)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: "860px",
            margin: "0 auto 1.75rem",
          }}
        >
          Your Perfect European Rental,{" "}
          <em style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
            Matched in 48 Hours.
          </em>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.72)",
            maxWidth: "620px",
            margin: "0 auto 2.75rem",
            lineHeight: 1.65,
          }}
        >
          Tell us where you&apos;re relocating, your budget, and what matters most — and
          we&apos;ll send you hand-curated, verified rental options. No listings to scroll.
          Verified landlords. Zero uncertainty.
        </p>

        {/* CTA Group */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            id="hero-cta"
            onClick={scrollToQuiz}
            className="btn btn-gold btn-lg"
            style={{ minWidth: "220px", fontSize: "1rem" }}
          >
            Start My Free Search
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: "rgba(255,255,255,0.85)",
              borderRadius: "var(--radius-full)",
              padding: "0.95rem 2rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
            }}
          >
            See how it works
          </button>
        </div>

        {/* Social proof micro-line */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            opacity: 0,
            animation: "fadeIn 0.8s ease 0.9s forwards",
          }}
        >
          {[
            { value: "2,400+", label: "Families Matched" },
            { value: "34", label: "Countries Covered" },
            { value: "48hrs", label: "Avg. Match Time" },
            { value: "4.9 ★", label: "Client Rating" },
          ].map((stat) => (
            <div key={stat.value} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-gold)", fontFamily: "var(--font-serif)" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          zIndex: 3,
          lineHeight: 0,
        }}
      >
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "60px", display: "block" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" />
        </svg>
      </div>
    </section>
  );
}
