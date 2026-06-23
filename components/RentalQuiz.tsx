"use client";

import { useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────
interface FormData {
  // Step 1
  country: string;
  city: string;
  // Step 2
  moveInDate: string;
  leaseType: string;
  // Step 3
  adults: number;
  children: number;
  pets: string;
  // Step 4
  budgetMin: number;
  budgetMax: number;
  currency: string;
  // Step 5
  bedrooms: string;
  furnished: string;
  mustHaves: string[];
  // Step 6
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

const INITIAL_FORM: FormData = {
  country: "",
  city: "",
  moveInDate: "",
  leaseType: "",
  adults: 1,
  children: 0,
  pets: "",
  budgetMin: 1000,
  budgetMax: 3000,
  currency: "EUR",
  bedrooms: "",
  furnished: "",
  mustHaves: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
};

const EUROPEAN_COUNTRIES = [
  "Albania", "Austria", "Belgium", "Bosnia & Herzegovina", "Bulgaria",
  "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy",
  "Kosovo", "Latvia", "Lithuania", "Luxembourg", "Malta", "Montenegro",
  "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal",
  "Romania", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden",
  "Switzerland", "Turkey", "Ukraine",
];

const MUST_HAVES = [
  "Parking", "Balcony / Terrace", "Garden", "High-speed WiFi",
  "Near metro / transit", "Gym", "Air conditioning", "Dishwasher",
  "English-speaking landlord", "Pet-friendly", "Near international school",
  "Concierge / Security", "Elevator", "Storage room",
];

const TOTAL_STEPS = 6;

// ─── Step Components ───────────────────────────────────────

function Step1({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string | number | string[]) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="form-group">
        <label className="form-label" htmlFor="country">Which country are you relocating to? *</label>
        <select
          id="country"
          className="form-input form-select"
          value={data.country}
          onChange={(e) => onChange("country", e.target.value)}
          required
        >
          <option value="">Select a country…</option>
          {EUROPEAN_COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="city">Preferred city or region? <span style={{ color: "var(--color-slate-light)", fontWeight: 400 }}>(optional)</span></label>
        <input
          id="city"
          type="text"
          className="form-input"
          value={data.city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="e.g. Barcelona, Amsterdam, Milan…"
        />
        <p className="text-caption" style={{ marginTop: "0.25rem" }}>Leave blank if you're open to suggestions</p>
      </div>
    </div>
  );
}

function Step2({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string | number | string[]) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="form-group">
        <label className="form-label" htmlFor="moveInDate">When do you need to move in? *</label>
        <input
          id="moveInDate"
          type="date"
          className="form-input"
          value={data.moveInDate}
          onChange={(e) => onChange("moveInDate", e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">What type of rental are you looking for? *</label>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {[
            { value: "short-term", label: "Short-term", sub: "1–6 months" },
            { value: "long-term", label: "Long-term", sub: "6+ months" },
            { value: "flexible", label: "Flexible", sub: "Either works" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange("leaseType", opt.value)}
              style={{
                flex: "1 1 140px",
                padding: "1rem",
                border: `2px solid ${data.leaseType === opt.value ? "var(--color-gold)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-md)",
                background: data.leaseType === opt.value ? "var(--color-gold-pale)" : "var(--color-white)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: 700, color: "var(--color-navy)", fontSize: "0.95rem" }}>{opt.label}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-slate)", marginTop: "0.2rem" }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string | number | string[]) => void }) {
  const Counter = ({ label, field, value, min = 0, max = 10 }: { label: string; field: keyof FormData; value: number; min?: number; max?: number }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "var(--color-white)", borderRadius: "var(--radius-md)", border: "1.5px solid var(--color-border)" }}>
      <span style={{ fontWeight: 600, color: "var(--color-navy)", fontSize: "0.95rem" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button type="button" onClick={() => onChange(field, Math.max(min, value - 1))} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid var(--color-border)", background: "var(--color-cream)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.2rem", color: "var(--color-navy)", transition: "all 0.15s ease" }} aria-label={`Decrease ${label}`}>−</button>
        <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--color-navy)", minWidth: "24px", textAlign: "center" }}>{value}</span>
        <button type="button" onClick={() => onChange(field, Math.min(max, value + 1))} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid var(--color-gold)", background: "var(--color-navy)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.2rem", color: "var(--color-gold)", transition: "all 0.15s ease" }} aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Counter label="👤 Adults" field="adults" value={data.adults} min={1} />
      <Counter label="👶 Children" field="children" value={data.children} min={0} />
      <div className="form-group" style={{ marginTop: "0.5rem" }}>
        <label className="form-label">Do you have pets?</label>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange("pets", opt)}
              style={{
                flex: 1,
                padding: "0.85rem",
                border: `2px solid ${data.pets === opt ? "var(--color-gold)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-md)",
                background: data.pets === opt ? "var(--color-gold-pale)" : "var(--color-white)",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "var(--color-navy)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {opt === "Yes" ? "🐾 Yes" : "❌ No"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string | number | string[]) => void }) {
  const formatBudget = (val: number) => `${val.toLocaleString()}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div className="form-group">
        <label className="form-label">Currency</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["EUR", "GBP", "USD"].map((cur) => (
            <button
              key={cur}
              type="button"
              onClick={() => onChange("currency", cur)}
              style={{
                padding: "0.6rem 1.25rem",
                border: `2px solid ${data.currency === cur ? "var(--color-gold)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-full)",
                background: data.currency === cur ? "var(--color-navy)" : "var(--color-white)",
                color: data.currency === cur ? "var(--color-gold)" : "var(--color-slate)",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cur === "EUR" ? "€ EUR" : cur === "GBP" ? "£ GBP" : "$ USD"}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Monthly Budget Range:{" "}
          <span style={{ color: "var(--color-gold-dark)", fontWeight: 700 }}>
            {data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$"}{formatBudget(data.budgetMin)} — {data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$"}{formatBudget(data.budgetMax)}
          </span>
        </label>

        <div style={{ background: "var(--color-white)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--color-border)" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--color-slate)", fontWeight: 500 }}>Minimum</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>{data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$"}{formatBudget(data.budgetMin)}/mo</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={500}
              max={data.budgetMax - 100}
              step={100}
              value={data.budgetMin}
              onChange={(e) => onChange("budgetMin", parseInt(e.target.value))}
              aria-label="Minimum budget"
              style={{ background: `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${((data.budgetMin - 500) / (9500)) * 100}%, var(--color-cream-dark) ${((data.budgetMin - 500) / (9500)) * 100}%, var(--color-cream-dark) 100%)` }}
            />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--color-slate)", fontWeight: 500 }}>Maximum</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>{data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$"}{formatBudget(data.budgetMax)}/mo</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={data.budgetMin + 100}
              max={10000}
              step={100}
              value={data.budgetMax}
              onChange={(e) => onChange("budgetMax", parseInt(e.target.value))}
              aria-label="Maximum budget"
              style={{ background: `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${((data.budgetMax - 500) / (9500)) * 100}%, var(--color-cream-dark) ${((data.budgetMax - 500) / (9500)) * 100}%, var(--color-cream-dark) 100%)` }}
            />
          </div>
        </div>
        <p className="text-caption" style={{ marginTop: "0.4rem" }}>
          Set to 10,000+ if your budget is flexible above this amount
        </p>
      </div>
    </div>
  );
}

function Step5({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string | number | string[]) => void }) {
  const toggleMustHave = (item: string) => {
    const current = data.mustHaves;
    const updated = current.includes(item) ? current.filter((x) => x !== item) : [...current, item];
    onChange("mustHaves", updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="form-group">
        <label className="form-label">Minimum bedrooms *</label>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {["Studio", "1", "2", "3", "4+"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange("bedrooms", opt)}
              style={{
                padding: "0.7rem 1.3rem",
                border: `2px solid ${data.bedrooms === opt ? "var(--color-gold)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-full)",
                background: data.bedrooms === opt ? "var(--color-gold-pale)" : "var(--color-white)",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--color-navy)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {opt === "Studio" ? "🛋️ Studio" : `${opt} ${opt === "1" ? "Bed" : "Beds"}`}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Furnished preference</label>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {[
            { value: "furnished", label: "✅ Furnished" },
            { value: "unfurnished", label: "📦 Unfurnished" },
            { value: "either", label: "🤷 Either" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange("furnished", opt.value)}
              style={{
                flex: 1,
                padding: "0.7rem 0.5rem",
                border: `2px solid ${data.furnished === opt.value ? "var(--color-gold)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-md)",
                background: data.furnished === opt.value ? "var(--color-gold-pale)" : "var(--color-white)",
                fontWeight: 600,
                fontSize: "0.82rem",
                color: "var(--color-navy)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Must-haves{" "}
          <span style={{ color: "var(--color-slate-light)", fontWeight: 400 }}>(select all that apply)</span>
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {MUST_HAVES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleMustHave(item)}
              className={`tag-btn ${data.mustHaves.includes(item) ? "selected" : ""}`}
            >
              {data.mustHaves.includes(item) && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step6({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string | number | string[]) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="step6-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First name *</label>
          <input
            id="firstName"
            type="text"
            className={`form-input ${errors.firstName ? "error" : ""}`}
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="James"
            required
            autoComplete="given-name"
          />
          {errors.firstName && <span className="form-error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last name *</label>
          <input
            id="lastName"
            type="text"
            className={`form-input ${errors.lastName ? "error" : ""}`}
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Mitchell"
            required
            autoComplete="family-name"
          />
          {errors.lastName && <span className="form-error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email address *</label>
        <input
          id="email"
          type="email"
          className={`form-input ${errors.email ? "error" : ""}`}
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="james@company.com"
          required
          autoComplete="email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phone">
          Phone number{" "}
          <span style={{ color: "var(--color-slate-light)", fontWeight: 400 }}>(optional — for urgent matches)</span>
        </label>
        <input
          id="phone"
          type="tel"
          className="form-input"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+44 7911 123456"
          autoComplete="tel"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="company">
          Company / Employer{" "}
          <span style={{ color: "var(--color-slate-light)", fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          className="form-input"
          value={data.company}
          onChange={(e) => onChange("company", e.target.value)}
          placeholder="Accenture, KPMG, Google…"
          autoComplete="organization"
        />
      </div>

      {/* Privacy note */}
      <div
        style={{
          padding: "0.9rem 1.1rem",
          background: "var(--color-navy-pale)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
          marginTop: "0.25rem",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: "2px" }}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p style={{ fontSize: "0.78rem", color: "var(--color-navy-light)", lineHeight: 1.5, margin: 0 }}>
          <strong>Your data is safe.</strong> We never sell, share, or spam. Your information is used exclusively to match you with the right properties.
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .step6-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Success Screen ─────────────────────────────────────────
function SuccessScreen({ name }: { name: string }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-navy), var(--color-navy-light))",
          border: "3px solid var(--color-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
          animation: "pulse-gold 2s infinite",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--color-navy)", marginBottom: "0.75rem" }}>
        You&apos;re on the list, {name}!
      </h3>
      <p style={{ color: "var(--color-slate)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "460px", margin: "0 auto 1.5rem" }}>
        Your rental brief has been received. Our team will review your requirements and send your curated property matches to your inbox within <strong style={{ color: "var(--color-navy)" }}>48 hours</strong>.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "380px", margin: "0 auto" }}>
        {[
          "Check your inbox (and spam folder) over the next 48 hours",
          "Each option will be verified and landlord-vetted",
          "Reply to our email to fast-track any match",
        ].map((tip, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", textAlign: "left" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "var(--color-gold-pale)", border: "1.5px solid var(--color-gold-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 700, color: "var(--color-gold-dark)" }}>{i + 1}</div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-slate)", lineHeight: 1.5, margin: 0 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Quiz Component ────────────────────────────────────
export default function RentalQuiz() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = useCallback((key: keyof FormData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1 && !formData.country) newErrors.country = "Please select a destination country.";
    if (step === 2) {
      if (!formData.moveInDate) newErrors.moveInDate = "Please select a move-in date.";
      if (!formData.leaseType) newErrors.leaseType = "Please select a rental type.";
    }
    if (step === 4) {
      if (formData.budgetMin >= formData.budgetMax) newErrors.budgetMin = "Min budget must be less than max.";
    }
    if (step === 5 && !formData.bedrooms) newErrors.bedrooms = "Please select a bedroom count.";
    if (step === 6) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required.";
      if (!formData.lastName.trim()) newErrors.lastName = "Required.";
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.document.getElementById("rental-quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepMeta = [
    { title: "Destination", emoji: "🌍" },
    { title: "Timeline", emoji: "📅" },
    { title: "Household", emoji: "👨‍👩‍👧" },
    { title: "Budget", emoji: "💰" },
    { title: "Preferences", emoji: "🏠" },
    { title: "Contact", emoji: "📬" },
  ];

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <section
      id="rental-quiz"
      className="section"
      style={{
        background: "linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-mid) 60%, #1a3040 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.06)", zIndex: 0, pointerEvents: "none" }} />

      <div className="container-sm" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "0.75rem",
            }}
          >
            Rental Matching Quiz
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--color-white)",
              marginBottom: "0.75rem",
            }}
          >
            Find Your Perfect European Rental
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
            Takes about 2 minutes. Our concierge team will send you curated matches within 48 hours.
          </p>
        </div>

        {/* Quiz card */}
        <div
          style={{
            background: "var(--color-white)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1rem, 5vw, 2.75rem)",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--color-border-gold)",
          }}
        >
          {submitted ? (
            <SuccessScreen name={formData.firstName} />
          ) : (
            <>
              {/* Progress section */}
              <div style={{ marginBottom: "2rem" }}>
                {/* Step dots & labels */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.85rem",
                    gap: "0.25rem",
                    overflowX: "auto",
                    paddingBottom: "0.25rem",
                  }}
                >
                  {stepMeta.map((meta, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.3rem",
                        flex: "1 1 0",
                        minWidth: "48px",
                        opacity: i + 1 <= step ? 1 : 0.35,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: i + 1 < step ? "var(--color-navy)" : i + 1 === step ? "var(--color-gold)" : "var(--color-cream-dark)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: i + 1 < step ? "0.8rem" : "0.9rem",
                          transition: "all 0.3s ease",
                          flexShrink: 0,
                          border: i + 1 === step ? "2px solid var(--color-gold-dark)" : "2px solid transparent",
                        }}
                      >
                        {i + 1 < step ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span>{meta.emoji}</span>
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: i + 1 === step ? 700 : 500,
                          color: i + 1 === step ? "var(--color-gold-dark)" : "var(--color-slate-light)",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {meta.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.4rem",
                    fontSize: "0.75rem",
                    color: "var(--color-slate-light)",
                    fontWeight: 500,
                  }}
                >
                  <span>Step {step} of {TOTAL_STEPS}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>

              {/* Step content */}
              <div style={{ minHeight: "320px" }}>
                <div
                  key={step}
                  style={{ animation: "slideInRight 0.35s ease" }}
                >
                  {/* Step header */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.3rem",
                        color: "var(--color-navy)",
                        marginBottom: "0.3rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>{stepMeta[step - 1].emoji}</span>
                      {stepMeta[step - 1].title}
                    </h3>
                    <div style={{ width: "36px", height: "2px", background: "var(--color-gold)", borderRadius: "2px" }} />
                  </div>

                  {step === 1 && <Step1 data={formData} onChange={handleChange} />}
                  {step === 2 && <Step2 data={formData} onChange={handleChange} />}
                  {step === 3 && <Step3 data={formData} onChange={handleChange} />}
                  {step === 4 && <Step4 data={formData} onChange={handleChange} />}
                  {step === 5 && <Step5 data={formData} onChange={handleChange} />}
                  {step === 6 && <Step6 data={formData} onChange={handleChange} errors={errors} />}

                  {/* Field errors for non-input steps */}
                  {errors.leaseType && <p className="form-error" style={{ marginTop: "0.5rem" }}>{errors.leaseType}</p>}
                  {errors.budgetMin && <p className="form-error" style={{ marginTop: "0.5rem" }}>{errors.budgetMin}</p>}
                  {errors.bedrooms && <p className="form-error" style={{ marginTop: "0.5rem" }}>{errors.bedrooms}</p>}
                </div>
              </div>

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    display: step === 1 ? "none" : "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "none",
                    border: "1.5px solid var(--color-border)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.75rem 1.4rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--color-slate)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-navy)"; e.currentTarget.style.color = "var(--color-navy)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-slate)"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  Back
                </button>
                {step === 1 && <div />}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    id={`quiz-next-step-${step}`}
                    onClick={handleNext}
                    className="btn btn-gold"
                    style={{ minWidth: "160px" }}
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="quiz-submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn btn-gold"
                    style={{ minWidth: "200px", opacity: isSubmitting ? 0.75 : 1 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send My Brief
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                      </>
                    )}
                  </button>
                )}
              </div>

              {submitError && (
                <p style={{ color: "var(--color-error)", textAlign: "center", marginTop: "1rem", fontSize: "0.875rem" }}>
                  {submitError}
                </p>
              )}
            </>
          )}
        </div>

        {/* Below quiz trust signal */}
        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "🔒", text: "Data encrypted & private" },
            { icon: "✅", text: "100% free service" },
            { icon: "⚡", text: "Reply within 48 hours" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
