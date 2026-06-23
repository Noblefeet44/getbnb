"use client";

import { useState, useCallback } from "react";


// ─── Country data ─────────────────────────────────────────────────────────────
const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Bosnia & Herzegovina",
  "Brazil","Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Croatia",
  "Cyprus","Czech Republic","Denmark","Ecuador","Egypt","Estonia","Ethiopia","Finland","France",
  "Georgia","Germany","Ghana","Greece","Guatemala","Hungary","Iceland","India","Indonesia",
  "Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
  "Kosovo","Kuwait","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Malaysia","Malta",
  "Mexico","Moldova","Montenegro","Morocco","Netherlands","New Zealand","Nigeria","North Macedonia",
  "Norway","Oman","Pakistan","Panama","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia",
  "South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria",
  "Taiwan","Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zimbabwe",
];

const PHONE_CODES = [
  { code: "+1", country: "US/CA" },{ code: "+7", country: "RU/KZ" },{ code: "+20", country: "EG" },
  { code: "+27", country: "ZA" },{ code: "+30", country: "GR" },{ code: "+31", country: "NL" },
  { code: "+32", country: "BE" },{ code: "+33", country: "FR" },{ code: "+34", country: "ES" },
  { code: "+36", country: "HU" },{ code: "+39", country: "IT" },{ code: "+40", country: "RO" },
  { code: "+41", country: "CH" },{ code: "+43", country: "AT" },{ code: "+44", country: "GB" },
  { code: "+45", country: "DK" },{ code: "+46", country: "SE" },{ code: "+47", country: "NO" },
  { code: "+48", country: "PL" },{ code: "+49", country: "DE" },{ code: "+51", country: "PE" },
  { code: "+52", country: "MX" },{ code: "+54", country: "AR" },{ code: "+55", country: "BR" },
  { code: "+61", country: "AU" },{ code: "+64", country: "NZ" },{ code: "+81", country: "JP" },
  { code: "+82", country: "KR" },{ code: "+86", country: "CN" },{ code: "+90", country: "TR" },
  { code: "+91", country: "IN" },{ code: "+92", country: "PK" },{ code: "+212", country: "MA" },
  { code: "+213", country: "DZ" },{ code: "+234", country: "NG" },{ code: "+254", country: "KE" },
  { code: "+351", country: "PT" },{ code: "+352", country: "LU" },{ code: "+353", country: "IE" },
  { code: "+354", country: "IS" },{ code: "+356", country: "MT" },{ code: "+357", country: "CY" },
  { code: "+358", country: "FI" },{ code: "+359", country: "BG" },{ code: "+370", country: "LT" },
  { code: "+371", country: "LV" },{ code: "+372", country: "EE" },{ code: "+380", country: "UA" },
  { code: "+381", country: "RS" },{ code: "+385", country: "HR" },{ code: "+386", country: "SI" },
  { code: "+389", country: "MK" },{ code: "+420", country: "CZ" },{ code: "+421", country: "SK" },
  { code: "+971", country: "AE" },{ code: "+972", country: "IL" },
];

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormState {
  // S1
  fullName: string; dateOfBirth: string; email: string;
  phoneCountryCode: string; phoneNumber: string; citizenship: string;
  movingWith: string; emergencyContactName: string; emergencyContactPhone: string;
  // S2
  currentStreet: string; currentCity: string; currentState: string; currentCountry: string;
  timeAtAddress: string; landlordName: string; landlordPhone: string;
  reasonForMoving: string; currentMonthlyRent: string; previousAddress: string;
  // S3
  primaryReasonForMove: string; desiredStayLength: string;
  employerNameAddress: string; jobTitle: string; employmentStartDate: string;
  monthlyNetIncome: string; supervisorName: string; supervisorPhone: string; euVisaStatus: string;
}

type Errors = Partial<Record<keyof FormState, string>>;


const INIT: FormState = {
  fullName:"",dateOfBirth:"",email:"",phoneCountryCode:"+44",phoneNumber:"",
  citizenship:"",movingWith:"",emergencyContactName:"",emergencyContactPhone:"",
  currentStreet:"",currentCity:"",currentState:"",currentCountry:"",
  timeAtAddress:"",landlordName:"",landlordPhone:"",
  reasonForMoving:"",currentMonthlyRent:"",previousAddress:"",
  primaryReasonForMove:"",desiredStayLength:"",
  employerNameAddress:"",jobTitle:"",employmentStartDate:"",
  monthlyNetIncome:"",supervisorName:"",supervisorPhone:"",euVisaStatus:"",
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function SectionCard({ id, number, title, children }: {
  id: string; number: string; title: string; children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        background: "var(--color-white)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-md)",
        overflow: "hidden",
        scrollMarginTop: "104px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-navy), var(--color-navy-mid))",
          padding: "1.25rem clamp(1rem, 5vw, 2rem)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "40px",height: "40px",borderRadius: "50%",
            background: "rgba(201,168,76,0.15)",border: "2px solid var(--color-gold)",
            display: "flex",alignItems: "center",justifyContent: "center",
            color: "var(--color-gold)",fontSize: "0.85rem",fontWeight: 700,flexShrink: 0,
          }}
        >
          {number}
        </div>
        <h2 style={{ fontFamily: "var(--font-serif)",fontSize: "1.1rem",fontWeight: 600,color: "var(--color-white)",margin: 0 }}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(1.1rem, 5vw, 2rem) clamp(1rem, 5vw, 2rem)" }}>{children}</div>
    </div>
  );
}

function Field({ label, required, error, children, hint }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode; hint?: string;
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required ? (
          <span style={{ color: "var(--color-gold-dark)", marginLeft: "4px" }}>*</span>
        ) : (
          <span style={{ color: "var(--color-slate-light)", fontWeight: 400, fontSize: "0.78rem", marginLeft: "6px" }}>(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-caption" style={{ marginTop: "0.25rem" }}>{hint}</p>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

function PhoneField({ countryCode, phone, onCodeChange, onPhoneChange, error, id }: {
  countryCode: string; phone: string; onCodeChange:(v:string)=>void; onPhoneChange:(v:string)=>void;
  error?: string; id: string;
}) {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <select
        value={countryCode}
        onChange={(e) => onCodeChange(e.target.value)}
        className="form-input form-select"
        style={{ width: "120px", flexShrink: 0 }}
        aria-label="Phone country code"
      >
        {PHONE_CODES.map((p) => (
          <option key={`${p.code}-${p.country}`} value={p.code}>
            {p.code} {p.country}
          </option>
        ))}
      </select>
      <input
        id={id}
        type="tel"
        className={`form-input ${error ? "error" : ""}`}
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Phone number"
        autoComplete="tel-national"
        style={{ flex: 1 }}
      />
    </div>
  );
}

function RadioGroup({ options, value, onChange, name }: {
  options: string[]; value: string; onChange:(v:string)=>void; name: string;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {options.map((opt) => (
        <label
          key={opt}
          style={{
            display: "flex",alignItems: "center",gap: "0.5rem",
            padding: "0.6rem 1.1rem",borderRadius: "var(--radius-full)",
            border: `2px solid ${value === opt ? "var(--color-gold)" : "var(--color-border)"}`,
            background: value === opt ? "var(--color-gold-pale)" : "var(--color-white)",
            cursor: "pointer",fontSize: "0.875rem",fontWeight: value === opt ? 700 : 500,
            color: value === opt ? "var(--color-navy)" : "var(--color-slate)",
            transition: "all 0.18s ease",userSelect: "none",
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{ display: "none" }}
          />
          {value === opt && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-dark)" strokeWidth="3" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {opt}
        </label>
      ))}
    </div>
  );
}

// ─── Success Screen ──────────────────────────────────────────────────────────
function SuccessScreen({ applicationId, name }: { applicationId: string; name: string }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 2rem", maxWidth: "560px", margin: "0 auto" }}>
      <div
        style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-navy), var(--color-navy-light))",
          border: "3px solid var(--color-gold)", margin: "0 auto 2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span className="badge badge-gold" style={{ marginBottom: "1rem" }}>Application Received</span>

      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-navy)", marginBottom: "0.75rem" }}>
        Thank you, {name.split(" ")[0]}!
      </h2>
      <p style={{ color: "var(--color-slate)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
        Your formal rental application has been submitted. Our team will review your documents and contact you within <strong style={{ color: "var(--color-navy)" }}>2–3 business days</strong>.
      </p>

      {/* Application ID */}
      <div
        style={{
          background: "var(--color-navy)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.75rem",
          marginBottom: "2rem",
          display: "inline-block",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.4rem" }}>
          Your Application ID
        </p>
        <p style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", fontSize: "1.3rem", fontWeight: 700, margin: 0, letterSpacing: "0.04em" }}>
          {applicationId}
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", margin: "0.4rem 0 0" }}>
          Save this for your records
        </p>
      </div>

      {/* Next steps */}
      <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[
          "Check your inbox for a confirmation email",
          "Our team will verify your documents and references",
          "You'll receive curated property matches within 48 hours",
          "A GetBnB concierge will contact you to confirm next steps",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--color-gold-pale)", border: "1.5px solid var(--color-gold-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.72rem", fontWeight: 700, color: "var(--color-gold-dark)" }}>
              {i + 1}
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-slate)", margin: 0, lineHeight: 1.5 }}>{step}</p>
          </div>
        ))}
      </div>

      <a href="/" className="btn btn-primary" style={{ marginTop: "2rem", display: "inline-flex" }}>
        ← Back to GetBnB Home
      </a>
    </div>
  );
}

// ─── Main Form Component ─────────────────────────────────────────────────────
export default function ApplicationForm() {
  const [form, setForm] = useState<FormState>(INIT);
  const [errors, setErrors] = useState<Errors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const set = useCallback((key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const showPreviousAddress =
    form.timeAtAddress === "Less than 6 months" || form.timeAtAddress === "6–12 months";

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Required";
    if (!form.citizenship) e.citizenship = "Required";
    if (!form.movingWith) e.movingWith = "Required";
    if (!form.emergencyContactName.trim()) e.emergencyContactName = "Required";
    if (!form.emergencyContactPhone.trim()) e.emergencyContactPhone = "Required";
    if (!form.currentStreet.trim()) e.currentStreet = "Required";
    if (!form.currentCity.trim()) e.currentCity = "Required";
    if (!form.currentState.trim()) e.currentState = "Required";
    if (!form.currentCountry) e.currentCountry = "Required";
    if (!form.timeAtAddress) e.timeAtAddress = "Required";
    if (!form.reasonForMoving.trim() || form.reasonForMoving.length < 5) e.reasonForMoving = "Please provide a reason (min 5 characters)";
    if (!form.currentMonthlyRent.trim()) e.currentMonthlyRent = "Required";
    if (showPreviousAddress && !form.previousAddress.trim()) e.previousAddress = "Required when at present address less than 1 year";
    if (!form.primaryReasonForMove) e.primaryReasonForMove = "Required";
    if (!form.desiredStayLength) e.desiredStayLength = "Required";
    if (!form.employerNameAddress.trim()) e.employerNameAddress = "Required";
    if (!form.jobTitle.trim()) e.jobTitle = "Required";
    if (!form.employmentStartDate) e.employmentStartDate = "Required";
    if (!form.monthlyNetIncome.trim()) e.monthlyNetIncome = "Required";
    if (!form.supervisorName.trim()) e.supervisorName = "Required";
    if (!form.supervisorPhone.trim()) e.supervisorPhone = "Required";
    if (!form.euVisaStatus) e.euVisaStatus = "Required";
    setErrors(e);

    if (Object.keys(e).length > 0) {
      // Scroll to first error
      const firstErrorKey = Object.keys(e)[0];
      const el = document.getElementById(firstErrorKey) || document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setApplicationId(json.applicationId);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (submitted) return <SuccessScreen applicationId={applicationId} name={form.fullName} />;

  const inputClass = (key: keyof FormState) => `form-input${errors[key] ? " error" : ""}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>

      {/* ── Section 1: Personal Information ─────────────────────────────── */}
      <SectionCard id="section-1" number="01" title="Personal Information & Profile">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid-2">
          <Field label="Full Name" required error={errors.fullName}>
            <input id="fullName" type="text" className={inputClass("fullName")} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="James Alexander Mitchell" autoComplete="name" />
          </Field>
          <Field label="Date of Birth" required error={errors.dateOfBirth}>
            <input id="dateOfBirth" type="date" className={inputClass("dateOfBirth")} value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} max={new Date(Date.now() - 18*365*24*60*60*1000).toISOString().split("T")[0]} />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "1.25rem" }} className="form-grid-2">
          <Field label="Email Address" required error={errors.email}>
            <input id="email" type="email" className={inputClass("email")} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="james@company.com" autoComplete="email" />
          </Field>
          <Field label="Phone Number" required error={errors.phoneNumber}>
            <PhoneField
              id="phoneNumber"
              countryCode={form.phoneCountryCode}
              phone={form.phoneNumber}
              onCodeChange={(v) => set("phoneCountryCode", v)}
              onPhoneChange={(v) => set("phoneNumber", v)}
              error={errors.phoneNumber}
            />
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Current Citizenship / Nationality" required error={errors.citizenship}>
            <select id="citizenship" className={`form-input form-select${errors.citizenship ? " error" : ""}`} value={form.citizenship} onChange={(e) => set("citizenship", e.target.value)}>
              <option value="">Select your nationality…</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Who is moving with you?" required error={errors.movingWith}>
            <RadioGroup
              name="movingWith"
              options={["Just me","Me & Partner","Family with kids","Roommates","Pets"]}
              value={form.movingWith}
              onChange={(v) => set("movingWith", v)}
            />
            {errors.movingWith && <span className="form-error">{errors.movingWith}</span>}
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem", padding: "1.25rem", background: "var(--color-cream)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Emergency Contact
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-grid-2">
            <Field label="Emergency Contact Name" required error={errors.emergencyContactName}>
              <input id="emergencyContactName" type="text" className={inputClass("emergencyContactName")} value={form.emergencyContactName} onChange={(e) => set("emergencyContactName", e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Emergency Contact Phone" required error={errors.emergencyContactPhone}>
              <input id="emergencyContactPhone" type="tel" className={inputClass("emergencyContactPhone")} value={form.emergencyContactPhone} onChange={(e) => set("emergencyContactPhone", e.target.value)} placeholder="+44 7911 000000" />
            </Field>
          </div>
        </div>
      </SectionCard>

      {/* ── Section 2: Residency History ─────────────────────────────────── */}
      <SectionCard id="section-2" number="02" title="Resident's History">
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Current Physical Address
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Field label="Street Address" required error={errors.currentStreet}>
              <input id="currentStreet" type="text" className={inputClass("currentStreet")} value={form.currentStreet} onChange={(e) => set("currentStreet", e.target.value)} placeholder="123 High Street, Apt 4B" autoComplete="address-line1" />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }} className="form-grid-3">
              <Field label="City" required error={errors.currentCity}>
                <input id="currentCity" type="text" className={inputClass("currentCity")} value={form.currentCity} onChange={(e) => set("currentCity", e.target.value)} placeholder="London" autoComplete="address-level2" />
              </Field>
              <Field label="State / Region" required error={errors.currentState}>
                <input id="currentState" type="text" className={inputClass("currentState")} value={form.currentState} onChange={(e) => set("currentState", e.target.value)} placeholder="England" autoComplete="address-level1" />
              </Field>
              <Field label="Country" required error={errors.currentCountry}>
                <select id="currentCountry" className={`form-input form-select${errors.currentCountry ? " error" : ""}`} value={form.currentCountry} onChange={(e) => set("currentCountry", e.target.value)} autoComplete="country">
                  <option value="">Select…</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
          </div>
        </div>

        <Field label="How Long at Present Address?" required error={errors.timeAtAddress}>
          <select id="timeAtAddress" className={`form-input form-select${errors.timeAtAddress ? " error" : ""}`} value={form.timeAtAddress} onChange={(e) => set("timeAtAddress", e.target.value)}>
            <option value="">Select…</option>
            {["Less than 6 months","6–12 months","1–2 years","2–5 years","5+ years"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "1.25rem" }} className="form-grid-2">
          <Field label="Current Landlord Name" error={errors.landlordName}>
            <input id="landlordName" type="text" className="form-input" value={form.landlordName} onChange={(e) => set("landlordName", e.target.value)} placeholder="Landlord full name" />
          </Field>
          <Field label="Landlord Contact Phone" error={errors.landlordPhone}>
            <input id="landlordPhone" type="tel" className="form-input" value={form.landlordPhone} onChange={(e) => set("landlordPhone", e.target.value)} placeholder="+44 7900 000000" />
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Reason for Moving" required error={errors.reasonForMoving} hint="Be specific — this helps landlords understand your situation">
            <textarea
              id="reasonForMoving"
              className={`form-input${errors.reasonForMoving ? " error" : ""}`}
              value={form.reasonForMoving}
              onChange={(e) => set("reasonForMoving", e.target.value)}
              placeholder="e.g. Career relocation to Barcelona for a new role at Accenture's European HQ…"
              rows={3}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Current Monthly Rent Amount" required error={errors.currentMonthlyRent} hint="Include currency — e.g. £2,200/month or €1,800/month">
            <input id="currentMonthlyRent" type="text" className={inputClass("currentMonthlyRent")} value={form.currentMonthlyRent} onChange={(e) => set("currentMonthlyRent", e.target.value)} placeholder="£2,200 / month" />
          </Field>
        </div>

        {/* Conditional: previous address */}
        {showPreviousAddress && (
          <div
            style={{ marginTop: "1.25rem", padding: "1.25rem", background: "var(--color-gold-pale)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-gold-light)", animation: "fadeIn 0.35s ease" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-dark)" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-gold-dark)" }}>Required — Less than 1 year at present address</span>
            </div>
            <Field label="Previous Physical Address" required error={errors.previousAddress} hint="Complete if less than one year at present address">
              <input id="previousAddress" type="text" className={inputClass("previousAddress")} value={form.previousAddress} onChange={(e) => set("previousAddress", e.target.value)} placeholder="Full previous address, City, Country" />
            </Field>
          </div>
        )}
      </SectionCard>

      {/* ── Section 3: Employment & Verifications ────────────────────────── */}
      <SectionCard id="section-3" number="03" title="Employment & Verifications">
        <Field label="Primary Reason for Move" required error={errors.primaryReasonForMove}>
          <select id="primaryReasonForMove" className={`form-input form-select${errors.primaryReasonForMove ? " error" : ""}`} value={form.primaryReasonForMove} onChange={(e) => set("primaryReasonForMove", e.target.value)}>
            <option value="">Select…</option>
            {["Remote Work / Digital Nomad","Corporate Relocation","Studies","Retirement","Family Reunion","Other"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Desired Length of Stay" required error={errors.desiredStayLength}>
            <RadioGroup
              name="desiredStayLength"
              options={["1–3 months","3–6 months","6–12 months","1+ year (long-term)"]}
              value={form.desiredStayLength}
              onChange={(v) => set("desiredStayLength", v)}
            />
            {errors.desiredStayLength && <span className="form-error">{errors.desiredStayLength}</span>}
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Current Employer Name & Address" required error={errors.employerNameAddress} hint="Include company name and full office address">
            <input id="employerNameAddress" type="text" className={inputClass("employerNameAddress")} value={form.employerNameAddress} onChange={(e) => set("employerNameAddress", e.target.value)} placeholder="Accenture — 1 Plantation Place, London EC3M 3AF" />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "1.25rem" }} className="form-grid-2">
          <Field label="Position Held / Job Title" required error={errors.jobTitle}>
            <input id="jobTitle" type="text" className={inputClass("jobTitle")} value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} placeholder="Senior Strategy Director" />
          </Field>
          <Field label="Employment Starting Date" required error={errors.employmentStartDate}>
            <input id="employmentStartDate" type="date" className={inputClass("employmentStartDate")} value={form.employmentStartDate} onChange={(e) => set("employmentStartDate", e.target.value)} />
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Monthly Net Income" required error={errors.monthlyNetIncome} hint="After tax — include currency symbol (e.g. £6,500 / month)">
            <input id="monthlyNetIncome" type="text" className={inputClass("monthlyNetIncome")} value={form.monthlyNetIncome} onChange={(e) => set("monthlyNetIncome", e.target.value)} placeholder="£6,500 / month" />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "1.25rem" }} className="form-grid-2">
          <Field label="Supervisor Name" required error={errors.supervisorName}>
            <input id="supervisorName" type="text" className={inputClass("supervisorName")} value={form.supervisorName} onChange={(e) => set("supervisorName", e.target.value)} placeholder="Sarah Thompson" />
          </Field>
          <Field label="Supervisor Phone Number" required error={errors.supervisorPhone}>
            <input id="supervisorPhone" type="tel" className={inputClass("supervisorPhone")} value={form.supervisorPhone} onChange={(e) => set("supervisorPhone", e.target.value)} placeholder="+44 20 7946 0000" />
          </Field>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Do you already have a valid EU Visa or European Passport?" required error={errors.euVisaStatus}>
            <RadioGroup
              name="euVisaStatus"
              options={["Yes — valid EU Visa","Yes — European Passport","In progress / Applied","No"]}
              value={form.euVisaStatus}
              onChange={(v) => set("euVisaStatus", v)}
            />
            {errors.euVisaStatus && <span className="form-error">{errors.euVisaStatus}</span>}
          </Field>
        </div>
      </SectionCard>

      {/* ── Submit ─────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {submitError && (
          <div style={{ padding: "1rem 1.25rem", background: "#FEE2E2", border: "1px solid #FECACA", borderRadius: "var(--radius-md)", color: "var(--color-error)", fontSize: "0.875rem", fontWeight: 500 }}>
            ⚠️ {submitError}
          </div>
        )}

        <button
          id="submit-application"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "1.15rem 2rem",
            background: isSubmitting ? "var(--color-slate-light)" : "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-full)",
            fontSize: "1.05rem",
            fontWeight: 700,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            boxShadow: isSubmitting ? "none" : "var(--shadow-gold)",
            transition: "all 0.25s ease",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.45)"; }}}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-gold)"; }}
        >
          {isSubmitting ? (
            <>
              <div className="spinner" />
              Submitting Application…
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Verify &amp; Submit Formal Rental Application
            </>
          )}
        </button>

        <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--color-slate-light)", lineHeight: 1.6 }}>
          By submitting, you confirm that all information provided is accurate and complete. Misrepresentations may result in termination of any rental agreement.
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-grid-2, .form-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
