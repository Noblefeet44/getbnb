import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";
import ApplicationForm from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Formal Rental Application — GetBnB",
  description:
    "Submit your formal European rental application. Provide your residency history, employment details, and identity documents to be matched with verified properties across Europe.",
  robots: { index: false, follow: false }, // keep application page off search index
};

export default function ApplicationPage() {
  return (
    <>
      <Navbar />

      <main style={{ background: "var(--color-cream)", paddingTop: "72px", minHeight: "100vh" }}>

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-mid) 100%)",
            padding: "3rem 0 3.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.1)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "10%", width: "200px", height: "200px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.07)", pointerEvents: "none" }} />

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <style>{`.app-breadcrumb-link:hover { color: rgba(255,255,255,0.85) !important; }`}</style>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <a
                href="/"
                className="app-breadcrumb-link"
                style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", fontWeight: 500 }}
              >
                GetBnB Home
              </a>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                Formal Application
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
              <div>
                <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.6rem" }}>
                  Official Document
                </span>
                <h1
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    margin: "0 0 0.75rem",
                    lineHeight: 1.15,
                  }}
                >
                  Formal Rental Application
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", maxWidth: "540px", lineHeight: 1.6, margin: 0 }}>
                  Complete all sections accurately. Applications are reviewed within 2–3 business days and matched with verified European properties.
                </p>
              </div>

              {/* Step badges */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { n: "1", label: "Personal Info" },
                  { n: "2", label: "Residency" },
                  { n: "3", label: "Employment" },
                ].map(({ n, label }) => (

                  <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.85rem", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "var(--radius-full)" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--color-gold)", color: "white", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Disclaimer Banner ─────────────────────────────────────────────── */}
        <div style={{ background: "var(--color-white)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ padding: "1.25rem 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem 1.5rem",
                background: "var(--color-navy)",
                borderLeft: "4px solid var(--color-gold)",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: "1px" }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: "var(--color-gold)", fontWeight: 700 }}>IMPORTANT: </strong>
                ONE APPLICATION FOR EACH ADULT APPLICANT (18 YEARS OF AGE OR OLDER). All information on this application must be completed. If misrepresentations are found after a rental agreement is signed, your rental agreement will be terminated.
              </p>
            </div>
          </div>
        </div>

        {/* ── Body: Sidebar + Form ─────────────────────────────────────────── */}
        <div
          className="container app-layout-container"
          style={{
            paddingTop: "var(--space-2xl)",
            paddingBottom: "var(--space-2xl)",
          }}
        >
          {/* Sidebar nav (desktop only — mobile is rendered inside SectionNav) */}
          <SectionNav />

          {/* Main form content */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
            <ApplicationForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
