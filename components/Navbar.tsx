"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToQuiz = () => {
    document.getElementById("rental-quiz")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-nav)",
        transition: "all 0.35s ease",
        background: scrolled ? "rgba(250,248,245,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(27,42,74,0.08)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        {/* Logo */}
        <a
          href="#"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
          aria-label="GetBnB Home"
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "var(--color-navy)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "var(--color-gold)", fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>G</span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.35rem",
              color: scrolled ? "var(--color-navy)" : "var(--color-white)",
              transition: "color 0.3s ease",
              letterSpacing: "-0.01em",
            }}
          >
            Get<span style={{ color: "var(--color-gold)" }}>Bnb</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "var(--space-xl)" }}
          className="desktop-nav"
        >
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Why GetBnB", id: "pain-points" },
            { label: "Testimonials", id: "testimonials" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: scrolled ? "var(--color-slate)" : "rgba(255,255,255,0.85)",
                cursor: "pointer",
                transition: "color 0.2s ease",
                padding: "0.25rem 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "var(--color-navy)" : "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "var(--color-slate)" : "rgba(255,255,255,0.85)")}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            id="nav-cta"
            onClick={scrollToQuiz}
            className="btn btn-gold"
            style={{ fontSize: "0.88rem", padding: "0.65rem 1.5rem" }}
          >
            Find My Rental
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="hamburger-btn"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "4px",
              padding: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: scrolled ? "var(--color-navy)" : "white",
                  borderRadius: "2px",
                  transition: "all 0.25s ease",
                  transformOrigin: "center",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4px, 4px)"
                        : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg) translate(4px, -4px)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-white)",
            borderTop: "1px solid var(--color-border)",
            padding: "1.5rem var(--space-xl)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Why GetBnB", id: "pain-points" },
            { label: "Testimonials", id: "testimonials" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--color-navy)",
                cursor: "pointer",
                textAlign: "left",
                padding: "0.5rem 0",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {item.label}
            </button>
          ))}
          <button onClick={scrollToQuiz} className="btn btn-gold" style={{ marginTop: "0.5rem" }}>
            Find My Rental
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
