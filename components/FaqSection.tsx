"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is this service completely free?",
    a: "Yes, 100% free for renters. We are compensated by verified landlords and property managers in our network — similar to how a recruitment agency works. You never pay a cent.",
  },
  {
    q: "Which countries do you cover?",
    a: "We cover 34+ European countries including Spain, Portugal, France, Italy, Germany, the Netherlands, Belgium, Poland, Austria, Switzerland, Greece, Malta, Cyprus, and more. If you're moving somewhere in Europe, we almost certainly have a presence there.",
  },
  {
    q: "How long does it take to receive my matches?",
    a: "Our standard turnaround is 48 hours for your first curated shortlist. For urgent moves (less than 4 weeks away), let us know in the form and we will prioritize your brief.",
  },
  {
    q: "How do you verify properties and listings?",
    a: "Every property in our network has been manually verified by our local team. We confirm the landlord's identity, review the lease contract, and vet the physical address. We never share unverified properties.",
  },
  {
    q: "Can you help with short-term rentals or furnished apartments?",
    a: "Absolutely. We handle everything from 1-month furnished studio apartments to multi-year family home leases. Just indicate your requirements in the quiz and we'll match accordingly.",
  },
  {
    q: "What if I'm not happy with the matches?",
    a: "Just reply to our email and tell us what's not working — the location, price, size, or anything else. We refine and re-run the search at no charge. Our goal is to get you into the right home, full stop.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section"
      style={{ background: "var(--color-white)" }}
    >
      <div className="container-sm">
        <div className="section-header">
          <span className="text-overline">FAQ</span>
          <h2 className="text-h2">Your Questions, Answered</h2>
          <div className="gold-line" />
          <p className="text-lead" style={{ marginTop: "1.25rem" }}>
            Everything you need to know before submitting your rental brief.
          </p>
        </div>

        <div
          style={{
            background: "var(--color-cream)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1.25rem, 3vw, 2rem)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {faqs.map((faq, i) => (
            <div key={i} className="accordion-item">
              <button
                className="accordion-trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                id={`faq-${i}`}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{faq.q}</span>
                <span className={`accordion-icon ${openIndex === i ? "open" : ""}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-${i}`}
                className={`accordion-content ${openIndex === i ? "open" : ""}`}
              >
                <p
                  style={{
                    color: "var(--color-slate)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "2.5rem",
            textAlign: "center",
            background: "linear-gradient(135deg, var(--color-navy), var(--color-navy-mid))",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem",
            color: "var(--color-white)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
              marginBottom: "0.75rem",
              color: "var(--color-white)",
            }}
          >
            Still have questions?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Our concierge team responds to all enquiries within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("rental-quiz")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-gold"
            >
              Start My Search
            </button>
            <a
              href="mailto:hello@getbnb.com"
              className="btn"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
