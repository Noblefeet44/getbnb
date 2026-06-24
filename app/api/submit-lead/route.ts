import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/airtableClient";

// ─── Validation Schema ────────────────────────────────────────────────────────
const LeadSchema = z.object({
  // Step 1
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  // Step 2
  moveInDate: z.string().min(1, "Move-in date is required"),
  leaseType: z.string().min(1, "Lease type is required"),
  // Step 3
  adults: z.number().min(1).max(20),
  children: z.number().min(0).max(20),
  pets: z.string().optional(),
  // Step 4
  budgetMin: z.number().min(0),
  budgetMax: z.number().min(0),
  currency: z.string().min(1),
  // Step 5
  bedrooms: z.string().optional(),
  furnished: z.string().optional(),
  mustHaves: z.array(z.string()).optional(),
  // Step 6
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

// ─── Email HTML Template ──────────────────────────────────────────────────────
function buildEmailHtml(data: z.infer<typeof LeadSchema>): string {
  const currencySymbol = data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$";
  const mustHavesText = data.mustHaves?.length ? data.mustHaves.join(", ") : "None specified";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Rental Lead</title>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1B2A4A, #2E4272); padding: 28px 32px; }
    .header h1 { color: white; margin: 0; font-size: 20px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.65); margin: 6px 0 0; font-size: 13px; }
    .gold-bar { height: 4px; background: linear-gradient(to right, #C9A84C, #A8872D); }
    .body { padding: 28px 32px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #C9A84C; margin: 24px 0 12px; border-bottom: 1px solid #f0e8d8; padding-bottom: 8px; }
    .section-title:first-child { margin-top: 0; }
    .row { display: flex; margin-bottom: 10px; }
    .label { font-size: 13px; color: #64748B; font-weight: 500; min-width: 160px; }
    .value { font-size: 13px; color: #1B2A4A; font-weight: 600; flex: 1; }
    .highlight { background: #FAF3E0; border-left: 3px solid #C9A84C; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 16px 0; }
    .highlight .lead-name { font-size: 18px; font-weight: 700; color: #1B2A4A; }
    .highlight .lead-destination { font-size: 13px; color: #64748B; margin-top: 4px; }
    .footer { padding: 16px 32px; background: #f8f7f4; border-top: 1px solid #eee; }
    .footer p { font-size: 11px; color: #94A3B8; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏠 New Rental Lead — GetBnB</h1>
      <p>Submitted: ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
    </div>
    <div class="gold-bar"></div>
    <div class="body">

      <div class="highlight">
        <div class="lead-name">${data.firstName} ${data.lastName}</div>
        <div class="lead-destination">→ ${data.city ? `${data.city}, ` : ""}${data.country} &bull; ${data.leaseType} lease</div>
      </div>

      <div class="section-title">📍 Destination</div>
      <div class="row"><span class="label">Country</span><span class="value">${data.country}</span></div>
      <div class="row"><span class="label">City / Region</span><span class="value">${data.city || "Open / Flexible"}</span></div>

      <div class="section-title">📅 Timeline</div>
      <div class="row"><span class="label">Move-in Date</span><span class="value">${data.moveInDate}</span></div>
      <div class="row"><span class="label">Lease Type</span><span class="value">${data.leaseType.charAt(0).toUpperCase() + data.leaseType.slice(1)}</span></div>

      <div class="section-title">👨‍👩‍👧 Household</div>
      <div class="row"><span class="label">Adults</span><span class="value">${data.adults}</span></div>
      <div class="row"><span class="label">Children</span><span class="value">${data.children}</span></div>
      <div class="row"><span class="label">Pets</span><span class="value">${data.pets || "Not specified"}</span></div>

      <div class="section-title">💰 Budget</div>
      <div class="row"><span class="label">Monthly Range</span><span class="value">${currencySymbol}${data.budgetMin.toLocaleString()} — ${currencySymbol}${data.budgetMax.toLocaleString()} / month</span></div>
      <div class="row"><span class="label">Currency</span><span class="value">${data.currency}</span></div>

      <div class="section-title">🏠 Property Preferences</div>
      <div class="row"><span class="label">Bedrooms</span><span class="value">${data.bedrooms || "Not specified"}</span></div>
      <div class="row"><span class="label">Furnished</span><span class="value">${data.furnished || "Not specified"}</span></div>
      <div class="row"><span class="label">Must-haves</span><span class="value">${mustHavesText}</span></div>

      <div class="section-title">📬 Contact Details</div>
      <div class="row"><span class="label">Full Name</span><span class="value">${data.firstName} ${data.lastName}</span></div>
      <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${data.email}" style="color:#1B2A4A;">${data.email}</a></span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${data.phone || "Not provided"}</span></div>
      <div class="row"><span class="label">Company</span><span class="value">${data.company || "Not provided"}</span></div>

    </div>
    <div class="footer">
      <p>This lead was captured via GetBnB.com rental matching quiz. Reply to <strong>${data.email}</strong> within 48 hours to confirm receipt.</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Plain Text Fallback ──────────────────────────────────────────────────────
function buildEmailText(data: z.infer<typeof LeadSchema>): string {
  const currencySymbol = data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$";
  return `
NEW RENTAL LEAD — GetBnB
========================
Submitted: ${new Date().toISOString()}

CONTACT
  Name:    ${data.firstName} ${data.lastName}
  Email:   ${data.email}
  Phone:   ${data.phone || "N/A"}
  Company: ${data.company || "N/A"}

DESTINATION
  Country: ${data.country}
  City:    ${data.city || "Open/Flexible"}

TIMELINE
  Move-in: ${data.moveInDate}
  Type:    ${data.leaseType}

HOUSEHOLD
  Adults:   ${data.adults}
  Children: ${data.children}
  Pets:     ${data.pets || "N/A"}

BUDGET
  Range:    ${currencySymbol}${data.budgetMin.toLocaleString()} – ${currencySymbol}${data.budgetMax.toLocaleString()} / month
  Currency: ${data.currency}

PROPERTY
  Bedrooms:  ${data.bedrooms || "N/A"}
  Furnished: ${data.furnished || "N/A"}
  Must-haves: ${data.mustHaves?.join(", ") || "None"}
`.trim();
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const result = LeadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const leadId = `GETBNB-LEAD-${Date.now()}`;

    // ── Save to Airtable ─────────────────────────────────────────────────────
    const dbResult = await insertLead({ leadId, ...data });
    if (!dbResult.success) {
      console.error("[submit-lead] Airtable insertion failed:", dbResult.error);
    }

    // ── Log to console in development ────────────────────────────────────────
    if (process.env.NODE_ENV === "development") {
      console.log("\n═══════════════════════════════════════════");
      console.log(`📬 NEW LEAD CAPTURED: ${leadId}`);
      console.log(buildEmailText(data));
      console.log("═══════════════════════════════════════════\n");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
        leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
