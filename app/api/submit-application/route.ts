import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  saveApplication,
  generateApplicationId,
  type ApplicationRecord,
} from "@/lib/applicationStore";

// ─── Validation Schema ────────────────────────────────────────────────────────
const ApplicationSchema = z.object({
  // Section 1
  fullName: z.string().min(2, "Full name required"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  email: z.string().email("Valid email required"),
  phoneCountryCode: z.string().min(1, "Country code required"),
  phoneNumber: z.string().min(4, "Phone number required"),
  citizenship: z.string().min(1, "Citizenship required"),
  movingWith: z.string().min(1, "Required"),
  emergencyContactName: z.string().min(2, "Emergency contact name required"),
  emergencyContactPhone: z.string().min(4, "Emergency contact phone required"),
  // Section 2
  currentStreet: z.string().min(1, "Street address required"),
  currentCity: z.string().min(1, "City required"),
  currentState: z.string().min(1, "State/region required"),
  currentCountry: z.string().min(1, "Country required"),
  timeAtAddress: z.string().min(1, "Required"),
  landlordName: z.string().optional(),
  landlordPhone: z.string().optional(),
  reasonForMoving: z.string().min(5, "Please describe your reason for moving"),
  currentMonthlyRent: z.string().min(1, "Current rent amount required"),
  previousAddress: z.string().optional(),
  // Section 3
  primaryReasonForMove: z.string().min(1, "Required"),
  desiredStayLength: z.string().min(1, "Required"),
  employerNameAddress: z.string().min(1, "Employer name & address required"),
  jobTitle: z.string().min(1, "Job title required"),
  employmentStartDate: z.string().min(1, "Employment start date required"),
  monthlyNetIncome: z.string().min(1, "Monthly income required"),
  supervisorName: z.string().min(1, "Supervisor name required"),
  supervisorPhone: z.string().min(4, "Supervisor phone required"),
  euVisaStatus: z.string().min(1, "Required"),
});

// ─── Email Template ───────────────────────────────────────────────────────────
function buildApplicationEmail(
  data: z.infer<typeof ApplicationSchema>,
  applicationId: string,
  govIdUrl: string,
  travelDocUrl: string
): { html: string; text: string } {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px}
    .wrap{max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1)}
    .header{background:linear-gradient(135deg,#1B2A4A,#2E4272);padding:32px;border-bottom:4px solid #C9A84C}
    .header h1{color:#fff;margin:0;font-size:20px;font-weight:700}
    .header p{color:rgba(255,255,255,.6);margin:6px 0 0;font-size:13px}
    .app-id{display:inline-block;background:rgba(201,168,76,.2);border:1px solid #C9A84C;color:#C9A84C;padding:4px 14px;border-radius:99px;font-size:12px;font-weight:700;margin-top:10px;letter-spacing:.05em}
    .section{padding:24px 32px;border-bottom:1px solid #f0f0f0}
    .section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#C9A84C;margin:0 0 14px;padding-bottom:8px;border-bottom:1px solid #f0e8d8}
    .row{display:flex;margin-bottom:10px;gap:16px}
    .label{font-size:12px;color:#64748B;font-weight:600;min-width:200px;flex-shrink:0}
    .value{font-size:13px;color:#1B2A4A;font-weight:600}
    .doc-btn{display:inline-block;margin:4px 6px 4px 0;padding:8px 18px;background:#1B2A4A;color:#C9A84C;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none}
    .footer{padding:16px 32px;background:#f8f7f4;border-top:1px solid #eee}
    .footer p{font-size:11px;color:#94A3B8;margin:0}
    .disclaimer{margin:24px 32px 0;padding:14px 18px;background:#FFF8E6;border-left:4px solid #C9A84C;border-radius:0 8px 8px 0;font-size:12px;color:#5a4a1a;line-height:1.6}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>📋 Formal Rental Application — GetBnB</h1>
      <p>Submitted: ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
      <div class="app-id">${applicationId}</div>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> ONE APPLICATION FOR EACH ADULT APPLICANT (18 YEARS OF AGE OR OLDER). All information on this application must be completed. If misrepresentations are found after a rental agreement is signed, your rental agreement will be terminated.
    </div>

    <div class="section">
      <div class="section-title">Section 1 — Personal Information & Profile</div>
      <div class="row"><span class="label">Full Name</span><span class="value">${data.fullName}</span></div>
      <div class="row"><span class="label">Date of Birth</span><span class="value">${data.dateOfBirth}</span></div>
      <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${data.email}">${data.email}</a></span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${data.phoneCountryCode} ${data.phoneNumber}</span></div>
      <div class="row"><span class="label">Citizenship / Nationality</span><span class="value">${data.citizenship}</span></div>
      <div class="row"><span class="label">Moving With</span><span class="value">${data.movingWith}</span></div>
      <div class="row"><span class="label">Emergency Contact</span><span class="value">${data.emergencyContactName} — ${data.emergencyContactPhone}</span></div>
    </div>

    <div class="section">
      <div class="section-title">Section 2 — Residency History</div>
      <div class="row"><span class="label">Current Address</span><span class="value">${data.currentStreet}, ${data.currentCity}, ${data.currentState}, ${data.currentCountry}</span></div>
      <div class="row"><span class="label">Time at Address</span><span class="value">${data.timeAtAddress}</span></div>
      <div class="row"><span class="label">Landlord Name</span><span class="value">${data.landlordName || "Not provided"}</span></div>
      <div class="row"><span class="label">Landlord Phone</span><span class="value">${data.landlordPhone || "Not provided"}</span></div>
      <div class="row"><span class="label">Reason for Moving</span><span class="value">${data.reasonForMoving}</span></div>
      <div class="row"><span class="label">Current Monthly Rent</span><span class="value">${data.currentMonthlyRent}</span></div>
      ${data.previousAddress ? `<div class="row"><span class="label">Previous Address</span><span class="value">${data.previousAddress}</span></div>` : ""}
    </div>

    <div class="section">
      <div class="section-title">Section 3 — Employment & Verifications</div>
      <div class="row"><span class="label">Primary Reason for Move</span><span class="value">${data.primaryReasonForMove}</span></div>
      <div class="row"><span class="label">Desired Length of Stay</span><span class="value">${data.desiredStayLength}</span></div>
      <div class="row"><span class="label">Employer Name & Address</span><span class="value">${data.employerNameAddress}</span></div>
      <div class="row"><span class="label">Position / Job Title</span><span class="value">${data.jobTitle}</span></div>
      <div class="row"><span class="label">Employment Start Date</span><span class="value">${data.employmentStartDate}</span></div>
      <div class="row"><span class="label">Monthly Net Income</span><span class="value">${data.monthlyNetIncome}</span></div>
      <div class="row"><span class="label">Supervisor</span><span class="value">${data.supervisorName} — ${data.supervisorPhone}</span></div>
      <div class="row"><span class="label">EU Visa / European Passport</span><span class="value">${data.euVisaStatus}</span></div>
    </div>

    <div class="section">
      <div class="section-title">Section 4 — Uploaded Documents</div>
      <div class="row"><span class="label">Government-Issued ID</span><span class="value">
        ${govIdUrl && govIdUrl !== "dev-stub" ? `<a class="doc-btn" href="${govIdUrl}" target="_blank">View Document →</a>` : "<em>Dev mode — not uploaded</em>"}
      </span></div>
      <div class="row"><span class="label">Travel Document (Passport / Driver's Licence)</span><span class="value">
        ${travelDocUrl && travelDocUrl !== "dev-stub" ? `<a class="doc-btn" href="${travelDocUrl}" target="_blank">View Document →</a>` : "<em>Dev mode — not uploaded</em>"}
      </span></div>
    </div>

    <div class="footer">
      <p>Application ID: <strong>${applicationId}</strong>. Captured via GetBnB.com/application. Reply to <strong>${data.email}</strong> to contact the applicant.</p>
    </div>
  </div>
</body>
</html>`;

  const text = `
FORMAL RENTAL APPLICATION — GetBnB
====================================
Application ID: ${applicationId}
Submitted: ${new Date().toISOString()}

SECTION 1 — PERSONAL INFORMATION
  Full Name:     ${data.fullName}
  DOB:           ${data.dateOfBirth}
  Email:         ${data.email}
  Phone:         ${data.phoneCountryCode} ${data.phoneNumber}
  Citizenship:   ${data.citizenship}
  Moving With:   ${data.movingWith}
  Emergency:     ${data.emergencyContactName} — ${data.emergencyContactPhone}

SECTION 2 — RESIDENCY HISTORY
  Address:       ${data.currentStreet}, ${data.currentCity}, ${data.currentState}, ${data.currentCountry}
  Time There:    ${data.timeAtAddress}
  Landlord:      ${data.landlordName || "N/A"} / ${data.landlordPhone || "N/A"}
  Reason Moving: ${data.reasonForMoving}
  Current Rent:  ${data.currentMonthlyRent}
  Prev Address:  ${data.previousAddress || "N/A"}

SECTION 3 — EMPLOYMENT
  Move Reason:   ${data.primaryReasonForMove}
  Stay Length:   ${data.desiredStayLength}
  Employer:      ${data.employerNameAddress}
  Title:         ${data.jobTitle}
  Start Date:    ${data.employmentStartDate}
  Net Income:    ${data.monthlyNetIncome}
  Supervisor:    ${data.supervisorName} — ${data.supervisorPhone}
  EU Visa:       ${data.euVisaStatus}

SECTION 4 — DOCUMENTS
  Gov ID:        ${govIdUrl}
  Travel Doc:    ${travelDocUrl}
`.trim();

  return { html, text };
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const result = ApplicationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const applicationId = generateApplicationId();

    // ── Save to store ───────────────────────────────────────────────────────────────
    const record: ApplicationRecord = {
      applicationId,
      submittedAt: new Date().toISOString(),
      ...data,
      landlordName: data.landlordName ?? "",
      landlordPhone: data.landlordPhone ?? "",
      previousAddress: data.previousAddress ?? "",
      govIdFileUrl: "",
      travelDocFileUrl: "",
    };

    await saveApplication(record);

    // ── Log to console in development ────────────────────────────────────────
    if (process.env.NODE_ENV === "development") {
      const { text } = buildApplicationEmail(data, applicationId, "", "");
      console.log("\n═══════════════════════════════════════════════");
      console.log("📬 NEW RENTAL APPLICATION (dev mode — logged locally)");
      console.log(text);
      console.log("═══════════════════════════════════════════════\n");
    }

    return NextResponse.json({ success: true, applicationId }, { status: 200 });
  } catch (error) {
    console.error("[submit-application] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
