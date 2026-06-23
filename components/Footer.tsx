"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Services: ["How It Works", "Rental Matching", "Corporate Relocation", "Short-Term Stays"],
    Destinations: ["Spain", "Portugal", "Italy", "France", "Germany", "Netherlands"],
    Company: ["About Us", "Privacy Policy", "Terms of Service", "Contact"],
  };

  return (
    <footer
      style={{
        background: "var(--color-navy)",
        color: "var(--color-white)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Main footer content */}
      <div className="container" style={{ padding: "var(--space-3xl) 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "var(--space-2xl)",
            marginBottom: "var(--space-2xl)",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                <span style={{ color: "var(--color-gold)", fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>G</span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "var(--color-white)",
                  letterSpacing: "-0.01em",
                }}
              >
                Get<span style={{ color: "var(--color-gold)" }}>Bnb</span>
              </span>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "280px",
                marginBottom: "1.5rem",
              }}
            >
              Europe&apos;s premier rental concierge service for corporate relocatees, expats, and international families. We match. You move.
            </p>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: "hello@getbnb.com",
                },
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  text: "Pan-European Coverage",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--color-gold)" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  marginBottom: "1.1rem",
                }}
              >
                {heading}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.875rem",
                        transition: "color 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)", marginBottom: "1.5rem" }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
            © {currentYear} GetBnB. All rights reserved. Your perfect European rental awaits.
          </p>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "GDPR Compliance"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
